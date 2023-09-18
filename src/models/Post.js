
export class Post {
    constructor(data) {
        this.body = data.body
        this.imgUrl = data.imgUrl
        this.creatorId = data.creatorId
        this.likeIds = data.likeIds
        this.id = data.id
        this.creator = data.creator || {}
        this.createdAt = new Date(data.createdAt).toLocaleString(undefined, {
            timeStyle: 'short',
            dateStyle: 'medium',
        });
        this.updatedAt = new Date().toLocaleString(undefined, {
            timeStyle: 'short',
            dateStyle: 'medium',
        });
    }

}