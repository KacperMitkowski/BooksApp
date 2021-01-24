import React, { Component } from 'react';

export default class BookDetails extends Component {
    render() {
        let books = JSON.parse(sessionStorage.getItem("books"));
        let bookId = this.props.match.params.id;
        let token = sessionStorage.getItem("token");

        for (let book of books) {
            if (book.book_id == bookId && token) {
                return (
                    <React.Fragment>
                        <div class="container-fluid">
                            <div className="row mt-5 mb-5">
                                <div className="col-12 text-center">
                                    <h1>{book.title}</h1>
                                </div>
                            </div>
                            <div class="row mb-5">
                                <div class="col-2">Tytuł: {book.title}</div>
                                <div class="col-2">Autor: {`${book.author.first_name} ${book.author.last_name}`}</div>
                                <div class="col-2">Opis: {book.description}</div>
                                <div class="col-2">Data publikacji: {this.formatDate(book.publication_date)}</div>
                                <div class="col-2">Gatunek: {book.genre.title}</div>
                                <div class="col-2">ISBN: {book.isbn}</div>
                            </div>
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

        return [day, month, year].join('-');
    }
}