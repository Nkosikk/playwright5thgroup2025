export class Testimonial {
    title: string;
    rating: number;
    experience: string;

    constructor(title: string, rating: number, experience: string) {
        this.title = title;
        this.rating = rating;
        this.experience = experience;
    }
}