import Datastore from 'nedb-promise';

export class Todo {
    constructor(title, description, importance, dueDate) {
        let now = new Date().toISOString().slice(0,10);

        this.title = title || '';
        this.creationDate = now;
        this.description = description || '';
        this.dueDate = dueDate || new Date(new Date(now).setMonth(now.getMonth()+1).toISOString().slice(0,10));
        this.importance = importance || 1;
        this.done = false;
    }
}

export class TodoStore {
    constructor(db) {
        this.db = db || new Datastore({
            filename: './data/todos.db',
            autoload: true
        });
    }

    async add (req) {
        let todo = new Todo(req.body.title,
                            req.body.description,
                            req.body.importance,
                            req.body.dueDate
        );
        return await this.db.insert(todo);
    }

    async update (req) {
        return await this.db.update(
            { _id: req.params.id },
            { $set: {
                title: req.body.title,
                description: req.body.description,
                importance: req.body.importance,
                dueDate: req.body.dueDate
            }},
            {
                returnUpdatedDocs: true
            }
        );
    }

    async updateState (req) {
        return await this.db.update(
            { _id: req.params.id },
            { $set: {
                done: req.body.done,
            }},
            {
                returnUpdatedDocs: true
            }
        );
    }

    async delete(req) {
        return await this.db.remove({
            _id: req.params.id
        },{
            multi: false
        });
    }

    async get(req) {
        return await this.db
            .findOne({
                _id: req.params.id
            });
    }

    async all(req) {
        let sortParam = {};
        let sortBy = req.query.sortBy || 'creationDate';
        sortParam[sortBy] = -1;

        return await this.db.cfind()
            .sort(sortParam)
            .exec();
    }
}

export const todoStore = new TodoStore();