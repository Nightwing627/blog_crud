import njwt, { JwtBody } from 'njwt';
import repo from '../repositories/user.repository';
import * as  bcrypt from 'bcrypt';
import { Request, Response } from 'express'
import User from '../models/user';

const APP_SECRET: string = <string>process.env.APP_SECRET;

export const authenticated = (req: Request, res: Response, next: Function) => {
  if (req.body.userId) {
    return next();
  }

  res.status(401);
  res.json({ error: 'User not authenticated' });
}

const returnInvalidCredentials = (res: Response) => {
  res.status(401);
  return res.json({ error: 'Invalid username or password' });

}

export const login = async (req: Request, res: Response) => {
  console.log(req.body)
  const { email, password } = req.body;

  if (!(email && password)) {
    return res.status(400).send("Please input email and password")
  }

  const user = <User>await repo.getUserByEmail(email)

  console.log(user)
  if (!user) {
    return returnInvalidCredentials(res)
  }

  bcrypt.compare(password, user.password, (err, result) => {
    if (result) {
      return res.json({ user });
    } else {
      return returnInvalidCredentials(res);
    }
  });
}

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!(email && password)) {
    return res.status(400).send('Please input email and password')
  }
  const user: User = new User(email, password)
  const created: boolean = await repo.createUser(user)

  if (created) {
    return res.send("Success! You have successfully signed up. Please login to continue.");
  } else {
    const error: Error = new Error("Oh no! There was an error signing up. Please try again.");
    return res.status(500).send({ error: error.message });
  }
}
