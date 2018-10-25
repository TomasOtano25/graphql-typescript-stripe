import { IResolvers } from "graphql-tools";
import * as bcrypt from "bcryptjs";
import { User } from "./entity/User";
import { stripe } from "./stripe";

export const resolvers: IResolvers = {
  Query: {
    hello: () => "hi",
    me: async (_, __, { req }) => {
      // console.log(req.session);
      if (!req.session.userId) {
        return null;
      }
      return User.findOne({ where: { id: req.session.userId } });
    }
  },
  Mutation: {
    register: async (_, { email, password }) => {
      const hashedPassword = await bcrypt.hash(password, 10);

      await User.create({
        email,
        password: hashedPassword
      }).save();

      return true;
    },
    login: async (_, { email, password }, { req }) => {
      const user = await User.findOne({ where: { email } });

      // console.log(req);

      if (!user) {
        return null;
      }

      const valid = await bcrypt.compare(password, user.password);

      if (!valid) {
        return null;
      }

      req.session.userId = user.id;

      return user;
    },
    createSubscription: async (_, { source, ccLast4 }, { req }) => {
      if (!req.session || !req.session.userId) {
        throw new Error("not authenticated");
      }

      // const user: any = await User.findOne({
      //   where: { id: req.session.userId }
      // });

      const user: any = await User.findOne(req.session.userId);

      if (!user) {
        throw new Error("not found");
      }

      const customer = await stripe.customers.create({
        email: user.email,
        source,
        plan: process.env.PLAN
      });

      console.log(customer);

      user.stripeId = customer.id;
      user.type = "paid";
      user.ccLast4 = ccLast4;
      await user.save();
      // user.type = "test";

      return user;
    },
    changeCreditCard: async (_, { source, ccLast4 }, { req }) => {
      if (!req.session || !req.session.userId) {
        throw new Error("not authenticated");
      }

      const user = await User.findOne(req.session.userId);

      if (!user || !user.stripeId || user.type !== "paid") {
        throw new Error();
      }

      await stripe.customers.update(user.stripeId, {
        source
      });

      user.ccLast4 = ccLast4;
      await user.save();

      return user;
    }
  }
};
