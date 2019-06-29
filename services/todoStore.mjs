import Datastore from 'nedb-promise';

export class Todo {
    constructor(creator, title, description, importance, dueDate) {
        let now = new Date();

        this.title = title;
        this.creator = creator;
        this.creationDate = now;
        this.description = description || '';
        this.dueDate = dueDate || new Date(new Date(now).setMonth(now.getMonth()+1));
        this.importance = importance || 0;
        this.state = 'active';
    }
}

export class TodoStore {
    constructor(db) {
        this.db = db || new Datastore({
            filename: './data/todos.db',
            autoload: true
        });
    }

    // TODO: refactor params > req only
    async add (currentUser, title, description, importance, dueDate) {
        let todo = new Todo(currentUser, title, description, importance, dueDate);
        return await this.db.insert(todo);
    }

    async update (currentUser, id, title, description, importance, dueDate, state) {
        return await this.db.update(
            { _id: id, creator: currentUser },
            { $set: {
                    title: title,
                    description: description,
                    importance: importance,
                    dueDate: dueDate,
                    state: state }},
            { returnUpdatedDocs: true },
            function (err) {
                if (err){
                    return err;
                }
            }
        );
    }

    async delete(currentUser, req) {
        await this.db.update({
                _id: req.id,
                creator: currentUser},
            {$set: {"state": "DELETED"}
        });
        return await this.get(id);
    }

    async get(currentUser, req) {
        return await this.db
            .findOne({
                _id: req.id,
                creator: currentUser});
    }

    async all(currentUser) {
        return await this.db.cfind({
            creator: currentUser})
            .sort({ creationDate: -1 })
            .exec();
    }
}

export const todoStore = new TodoStore();