import React, { Component } from 'react';


export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            token: sessionStorage.getItem("token"),
            author: null,
            errorMessages: []
        };
    }

    render() {
        if (sessionStorage.getItem("author") && sessionStorage.getItem("token")) {
            sessionStorage.setItem("books", JSON.stringify(this.state.books))

            return (
                <React.Fragment>
                    {
                        this.state.errorMessage ?
                            <div class="alert alert-danger" role="alert">
                                {this.state.errorMessage}
                            </div>
                            : null
                    }
                    <div className="row mb-5">
                        <div className="col-12 text-center">
                            <button type="button" class="btn btn-danger btn-lg" onClick={() => this.handleCreate()}>Stwórz książkę</button>
                        </div>
                    </div>
                    <table className='table table-sm table-bordered' style={{ tableLayout: 'fixed' }}>
                        <thead className='thead-dark'>
                            <tr>
                                <th scope="col">#</th>
                                <th scope='col'>Tytuł</th>
                                <th scope='col'>Autor</th>
                                <th scope='col'>Opis</th>
                                <th scope='col'>Data publikacji</th>
                                <th scope='col'>Gatunek</th>
                                <th scope='col'>ISBN</th>
                                <th>&nbsp;</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.books && this.state.books.length > 0 ? this.state.books.map((book, i) => {
                                return (
                                    <tr key={`book-${i}`}>
                                        <th scope="row">{i + 1}</th>
                                        <td>{book.title}</td>
                                        <td>{`${book.author.first_name} ${book.author.last_name}`}</td>
                                        <td>{book.description}</td>
                                        <td>{this.formatDate(book.publication_date)}</td>
                                        <td>{book.genre.title}</td>
                                        <td>{book.isbn}</td>
                                        <td>
                                            <div className="d-flex justify-content-between">
                                                <button type="button" class="btn btn-danger" onClick={() => this.handleDetails(book.book_id)}>Szczegóły</button>
                                                <button type="button" class="btn btn-danger" onClick={() => this.handleEdit(book.book_id)}>Edycja</button>
                                                <button type="button" class="btn btn-danger" onClick={() => this.handleDelete(book.book_id)}>Usuwanie</button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            }) :
                                <h1>Autor nie posiada żadnych książek</h1>
                            }
                        </tbody>
                    </table>
                </React.Fragment>
            );
        }
        return null;
    }

    componentDidMount() {
        fetch(`/api/apiBook`, {
            headers: new Headers({
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
                this.setState({
                    books: data.books
                })
            });
    }

    handleDetails(book_id) {
        window.location = `/book/details/${book_id}`;
    }

    handleEdit(book_id) {
        window.location = `/book/edit/${book_id}`;
    }

    handleCreate() {
        window.location = `/book/create`;
    }

    handleDelete(book_id) {
        if (confirm("Usunąć książkę?")) {
            fetch(`/api/apiBook/${book_id}`, {
                method: 'DELETE',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': `${sessionStorage.getItem("author")}=${sessionStorage.getItem("token")}`
                })
            })
                .then(res => res.json())
                .then(data => {
                    if (data.bookDeleteSuccess == true) {
                        alert("Udane usunięcie książki");
                        window.location = "/";
                    }
                    else {
                        this.setState({
                            errorMessage: data.errorMessage
                        })
                    }
                }).catch(error => this.setState({ errorMessage: "Wystąpił błąd. Przepraszamy za kłopoty techniczne" }))
        }
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

        return [day, month, year].join('-');
    }
}