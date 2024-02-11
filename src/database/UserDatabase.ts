import { UserDB } from "../models/User";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {
  public static TABLE_USERS = "users"

  public async findUsers(
    q: string | undefined
  ): Promise<UserDB[]> {
    let usersDB

    if (q) {
      const result: UserDB[] = await BaseDatabase
        .connection(UserDatabase.TABLE_USERS)
        .where("nickname", "LIKE", `%${q}%`)

      usersDB = result
    } else {
      const result: UserDB[] = await BaseDatabase
        .connection(UserDatabase.TABLE_USERS)

      usersDB = result
    }

    return usersDB
  }

  public async findUserById(
    id: string
  ): Promise<UserDB | undefined> {
    const [userDB]: UserDB[] | undefined[] = await BaseDatabase
      .connection(UserDatabase.TABLE_USERS)
      .where({ id })

    return userDB
  }

  public async findUserByEmail(
    email: string
  ): Promise<UserDB | undefined> {
    const [userDB]: UserDB[] | undefined[] = await BaseDatabase
      .connection(UserDatabase.TABLE_USERS)
      .where({ email })

    return userDB
  }

  public async insertUser(
    newUserDB: UserDB
  ): Promise<void> {
    await BaseDatabase
      .connection(UserDatabase.TABLE_USERS)
      .insert(newUserDB)
  }

  public async editUserNickname(
    id: string, newNickname: string
  ): Promise<void> {
    await BaseDatabase
      .connection(UserDatabase.TABLE_USERS)
      .update({ nickname: newNickname })
      .where({ id })
  }

  public async editUserEmail(
    id: string, newEmail: string
  ): Promise<void> {
    await BaseDatabase
      .connection(UserDatabase.TABLE_USERS)
      .update({ email: newEmail })
      .where({ id })
  }

  public async editUserPassword(
    id: string, newPassword: string
  ): Promise<void> {
    await BaseDatabase
      .connection(UserDatabase.TABLE_USERS)
      .update({ password: newPassword })
      .where({ id })
  }

  public async deleteUser(
    idToDelete: string
  ): Promise<void> {
    await BaseDatabase
      .connection(UserDatabase.TABLE_USERS)
      .delete()
      .where({ id: idToDelete })
  }
}