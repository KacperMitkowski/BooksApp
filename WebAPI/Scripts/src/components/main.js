﻿import React, { Component } from 'react';


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
        if (this.state.books) {
            return (
                <React.Fragment>
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
                            {this.state.books.map((book, i) => {
                                return (
                                    <tr key={`book-${i}`}>
                                        <th scope="row">{i + 1}</th>
                                        <td>{book.title}</td>
                                        <td>{`${book.author.first_name} ${book.author.last_name}`}</td>
                                        <td>{book.description}</td>
                                        <td>{this.formatDate(book.publication_date)}</td>
                                        <td>{book.genre.title}</td>
                                        <td>{book.isbn}</td>
                                        <td></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </React.Fragment>
            );
        }
        return null;
    }

    componentDidMount() {
        fetch(`api/book`, {
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
                    books: JSON.parse(data)
                })
            });

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