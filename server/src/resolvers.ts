import { IResolvers } from "graphql-tools";
import * as bcrypt from "bcryptjs";
import { User } from "./entity/User";

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
    }
  }
};
