class AuthorViewDto {
  constructor(author) {
    this.id = author.id;
    this.name = author.name;
    this.surname = author.surname;
    this.fullName = `${this.name} ${this.surname}`;
    this.photo = author.photo;
  }
}

export default AuthorViewDto;
