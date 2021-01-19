import React, { Component } from 'react';


export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: []
        };
    }

    render() {
        
        if (this.state.books && this.state.books.length > 0) {
            console.log(this.state.books);
            return (
                <table className='table table-sm table-bordered' style={{ tableLayout: 'fixed' }}>
                    <thead className='thead-dark'>
                        <tr>
                            <th scope="col">#</th>
                            <th scope='col'>Tytuł</th>
                            <th scope='col'>Opis</th>
                            <th scope='col'>Data publikacji</th>
                            <th scope='col'>Autor</th>
                            <th scope='col'>Gatunek</th>
                            <th scope='col'>ISBN</th>
                            <th>&nbsp;</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.books.map((book, i) => {
                            let publicationDate = book['publication_date'];
                            let d = new Date(publicationDate);
                            let dateToDisplay = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`

                            return (
                                <tr key={`book-${i}`}>
                                    <th scope="row">{i + 1}</th>
                                    <td>{book['title']}</td>
                                    <td>{book['description']}</td>
                                    <td>{dateToDisplay}</td>
                                    <td>{book['author_id']}</td>
                                    <td>{book['genre_id']}</td>
                                    <td>{book['isbn']}</td>
                                    <td></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            );
        }
        return null;
    }

    componentDidMount() {
        fetch(`Book/`)
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
}