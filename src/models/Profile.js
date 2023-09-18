export class Profile {
    constructor(data) {

        this.id = data.id
        this.id = data.id
        this.name = data.name
        this.picture = data.picture
        this.bio = data.bio
        this.coverImg = data.coverImg
        this.resume = data.resume
        this.alumni = data.alumni
        this.linkedin = data.linkedin || "none"
        this.class = data.class
        this.email = data.email
        this.github = data.github
        this.graduated = data.graduated
        this.coverImg = data.coverImg
        this.graduated = data.graduated ? "Graduated" : "Not Graduated";
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
