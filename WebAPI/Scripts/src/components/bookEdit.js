import React, { Component } from 'react';

export default class BookEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: null,
            authorFirstName: null,
            authorLastName: null,
            description: null,
            publicationDate: null,
            genre: null,
            isbn: null,
            flag: true
        };
    }

    onTodoChange(value) {
        this.setState({
            title: value
        });
    }

    render() {
        let books = JSON.parse(sessionStorage.getItem("books"));
        let bookId = this.props.match.params.id;
        let token = sessionStorage.getItem("token");

        for (let book of books) {
            if (book.book_id == bookId && token && this.state.flag == true) {
                
                this.setState({
                    title: book.title,
                    authorFirstName: book.author.first_name,
                    authorLastName: book.author.last_name,
                    description: book.description,
                    genre: book.genre.title,
                    publicationDate: book.publication_date,
                    isbn: book.isbn,
                    flag: false
                })
            }
        }

        console.log(bookId);
        console.log(books);
      

        for (let book of books) {
            if (book.book_id == bookId && token) {
                
                return (
                    <div class="container-fluid mt-5 mb-5">
                        <div className="row mt-5 mb-5">
                            <div className="col-12 text-center">
                                <h1>(Edycja) {book.title}</h1>
                            </div>
                        </div>
                        <form>
                            <div class="form-row mt-5 mb-5">
                                <div class="col">
                                    <label for="title">Tytuł</label>
                                    <input type="text" id="title" class="form-control" placeholder="Tytuł" value={this.state.title} onChange={e => this.setState({ title: e.target.value })} />
                                </div>
                                <div class="col">
                                    <label for="first-name">Imię autora</label>
                                    <input type="text" id="first-name" class="form-control" placeholder="Imię autora" value={this.state.authorFirstName} onChange={e => this.setState({ authorFirstName: e.target.value })} />
                                </div>
                                <div class="col">
                                    <label for="last-name">Nazwisko autora</label>
                                    <input id="last-name" type="text" class="form-control" placeholder="Nazwisko autora" value={this.state.authorLastName} onChange={e => this.setState({ authorLastName: e.target.value })} />
                                </div>
                            </div>
                            <div class="form-row mt-5 mb-5">
                                <div class="col">
                                    <label for="publication-date">Data publikacji</label>
                                    <input id="publication-date" type="date" placeholder="Data publikacji" style={{ display: "block", width: "100%" }} value={this.formatDate(this.state.publicationDate)} onChange={e => this.setState({ publicationDate: e.target.value })}/>
                                </div>
                                <div class="col">
                                    <label for="genre">Gatunek</label>
                                    <input id="genre" type="text" class="form-control" placeholder="Gatunek" value={this.state.genre} onChange={e => this.setState({ genre: e.target.value })} />
                                </div>
                                <div class="col">
                                    <label for="isbn">ISBN</label>
                                    <input id="isbn" type="text" class="form-control" placeholder="ISBN" value={this.state.isbn} onChange={e => this.setState({ isbn: e.target.value })} />
                                </div>
                            </div>
                            <div class="form-row mt-5 mb-5">
                                <div class="col">
                                    <textarea class="form-control" placeholder="Opis" cols="10" rows="10" value={this.state.description} onChange={e => this.setState({ description: e.target.value })}>

                                    </textarea>
                                </div>
                                
                            </div>
                        </form>
                    </div>
                );
                document.getElementById("title").value = book.title;
            }
        }
        return (
            <div class="alert alert-primary" role="alert">
                Nie znaleziono książki
            </div>
        );
    }
    formatDate(date) {
        let d = new Date(date);
        let month = `${(d.getMonth() + 1)}`;
        let day = `${d.getDate()}`;
        let year = d.getFullYear();

        if (month.length < 2) {
            month = `0${month}`;
        }
        if (day.length < 2) {
            day = `0${day}`;
        }

        return [year, month, day].join('-');
    }
}