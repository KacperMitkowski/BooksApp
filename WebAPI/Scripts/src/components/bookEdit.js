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
            bookGenres: null,
            isbn: null,
            flag: true
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();

        let title = document.getElementById("title").value;
        let description = document.getElementById("description").value;
        let publicationDate = document.getElementById("publication-date").value;
        let isbn = document.getElementById("isbn").value;
        let authorId = document.getElementById("author-id").value;
        let genreId = document.getElementById("genre-id").value;
        let bookId = document.getElementById("book-id").value;

        fetch("/api/apiBook/put", {
            method: 'PUT',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `${sessionStorage.getItem("author")}=${sessionStorage.getItem("token")}`
            }),
            body: JSON.stringify({
                book_id: bookId,
                genre_id: genreId,
                author_id: authorId,
                title: title,
                description: description,
                publication_date: publicationDate,
                isbn: isbn
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.bookEditSuccess == true) {
                    alert("Udana edycja książki");
                    window.location = "/";
                }
                else {
                    this.setState({
                        errorMessage: data.errorMessage,
                    })
                }
            }).catch(error => this.setState({ errorMessage: "Wystąpił błąd. Przepraszamy za kłopoty techniczne" }))
    }

    render() {
        let books = JSON.parse(sessionStorage.getItem("books"));
        let bookId = this.props.match.params.id;
        let authorId = sessionStorage.getItem("authorId");
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

        for (let book of books) {
            if (book.book_id == bookId && token && this.state.bookGenres) {
                return (
                    <React.Fragment>
                        <div className="row mb-5">
                            <div className="col-12 text-center">
                                <a className="btn btn-danger btn-lg" href="/">Powrót</a>
                            </div>
                        </div>
                        <div className="container" style={{ width: "50%", margin: "0 auto", textAlign: 'center' }}>
                            {
                                this.state.errorMessage ?
                                    <div class="alert alert-danger" role="alert">
                                        {this.state.errorMessage}
                                    </div>
                                    : null
                            }
                            <input id="book-id" value={book.book_id} hidden />

                            <div className="row mt-5 mb-5">
                                <div className="col-12 text-center">
                                    <h1>(Edycja) {book.title}</h1>
                                </div>
                            </div>
                            <form onSubmit={this.handleSubmit} id="editBookForm">
                                <input id="author-id" type="text" value={authorId} hidden />
                                <div class="form-row mt-5 mb-5">
                                    <div class="col">
                                        <label for="title">Tytuł</label>
                                        <input type="text" id="title" class="form-control" placeholder="Tytuł" value={this.state.title} onChange={e => this.setState({ title: e.target.value })} />
                                    </div>
                                </div>
                                <div class="form-row mt-5 mb-5">
                                    <div class="col">
                                        <label for="publication-date">Data publikacji</label>
                                        <input id="publication-date" type="date" placeholder="Data publikacji" style={{ display: "block", width: "100%" }} value={this.formatDate(this.state.publicationDate)} onChange={e => this.setState({ publicationDate: e.target.value })} />
                                    </div>
                                    <div class="col">
                                        <label for="genre-id">Gatunek</label>
                                        <select id="genre-id" className="form-control form-control-sm">
                                            {this.state.bookGenres.map((genre, i) => {
                                                return (
                                                    <option value={genre.genre_id}>{genre.title}</option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                    <div class="col">
                                        <label for="isbn">ISBN</label>
                                        <input id="isbn" type="text" class="form-control" placeholder="ISBN" value={this.state.isbn} onChange={e => this.setState({ isbn: e.target.value })} />
                                    </div>
                                </div>
                                <div class="form-row mt-5 mb-5">
                                    <div class="col">
                                        <textarea id="description" class="form-control" placeholder="Opis" cols="10" rows="10" value={this.state.description} onChange={e => this.setState({ description: e.target.value })}>

                                        </textarea>
                                    </div>

                                </div>
                                <button class="btn btn-primary btn-lg">Edytuj</button>
                            </form>
                        </div>
                    </React.Fragment>
                );
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

    componentDidMount() {
        fetch(`/api/apiGenre/get`, {
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `${sessionStorage.getItem("author")}=${sessionStorage.getItem("token")}`
            })
        })
            .then(response => {
                if (response.status > 400) {
                    return this.setState(() => {
                        return { error: "Something went wrong!" };
                    });
                }
                return response.json();
            })
            .then(data => {
                if (data.genres) {
                    this.setState({
                        bookGenres: data.genres
                    });
                }
            });
    }
}
