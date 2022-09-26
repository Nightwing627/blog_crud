import * as sqlite from 'sqlite3'
const sqlite3 = sqlite.verbose();
const db = new sqlite3.Database('./db/sqlite.db');
import * as bcrypt from 'bcrypt';
const saltRounds = 10;

export default class {

    static setupDbForDev() {
        db.serialize(function () {
            //   Drop Tables:
            const dropUsersTable = "DROP TABLE IF EXISTS users";
            db.run(dropUsersTable);
            const dropBlogsTable = "DROP TABLE IF EXISTS blogs";
            db.run(dropBlogsTable);
            const dropBlogCommentsTable = "DROP TABLE IF EXISTS blog_comments";
            db.run(dropBlogCommentsTable);
            
            // Create Tables:
            const createUsersTable = "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT, password TEXT)";
            db.run(createUsersTable);
            const createBlogsTable = "CREATE TABLE IF NOT EXISTS blogs (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, content TEXT, user_id INTEGER, publish BOOLEAN)";
            db.run(createBlogsTable);
            const createBlogsCommentsTable = "CREATE TABLE IF NOT EXISTS blog_comments (id INTEGER PRIMARY KEY AUTOINCREMENT, blog_id INTEGER, content TEXT, user_id INTEGER)";
            db.run(createBlogsCommentsTable);
        });
    }

    static all(stmt, params) {
        return new Promise((res, rej) => {
            db.all(stmt, params, (error, result) => {
                if (error) {
                    return rej(error.message);
                }
                return res(result);
            });
        })
    }
    static get(stmt, params) {
        return new Promise((res, rej) => {
            db.get(stmt, params, (error, result) => {
                if (error) {
                    return rej(error.message);
                }
                return res(result);
            });
        })
    }

    static run(stmt, params) {
        return new Promise((res, rej) => {
            db.run(stmt, params, (error, result) => {
                if (error) {
                    return rej(error.message);
                }
                return res(result);
            });
        })
    }


}
