import React, { Component } from 'react';

export default class BookCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            authorFirstName: "",
            authorLastName: "",
            description: "",
            publicationDate: "",
            genre: "",
            isbn: "",
            bookGenres: null,
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
        let obj = {
            author: sessionStorage.getItem("author"),
            token: sessionStorage.getItem("token")
        }

        fetch("/api/apiBook", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': JSON.stringify(obj)
            },
            body: JSON.stringify({
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
                if (data == true) {
                    alert("Udało się dodać książkę");
                    window.location = "/";
                }
                this.setState({
                    errorMessage: "Wystąpił błąd. Przepraszamy za kłopoty techniczne",

                })
            }).catch(error => this.setState({ errorMessage: "Wystąpił błąd. Przepraszamy za kłopoty techniczne" }))
    }

    render() {
        let token = sessionStorage.getItem("token");
        let author = sessionStorage.getItem("author");
        let authorId = sessionStorage.getItem("authorId");

        if (token && author && authorId && this.state.bookGenres) {
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
                        <div className="row mt-5 mb-5">
                            <div className="col-12 text-center">
                                <h1>(Tworzenie) Książka</h1>
                            </div>
                        </div>
                        <form onSubmit={this.handleSubmit} id="createBookForm">
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
                                    <input id="publication-date" type="date" placeholder="Data publikacji" style={{ display: "block", width: "100%" }} value={this.state.publicationDate} onChange={e => this.setState({ publicationDate: e.target.value })} />
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
                            <button class="btn btn-primary btn-lg">Stwórz</button>
                        </form>
                    </div>
                </React.Fragment>
            );
        }
        return null;
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
        fetch(`/api/apiGenre`)
            .then(response => {
                if (response.status > 400) {
                    return this.setState(() => {
                        return { error: "Something went wrong!" };
                    });
                }
                return response.json();
            })
            .then(data => {
                this.setState({
                    bookGenres: JSON.parse(data)
                })
            });
    }
}
