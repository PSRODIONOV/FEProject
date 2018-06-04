import React from 'react';
import ReactDOM from 'react-dom';

import Select from 'react-select';
import { Navbar, Nav, NavItem, Grid, Row, Col, FormGroup, InputGroup, FormControl, Button, Table } from 'react-bootstrap';
import axios from 'axios';

const API_KEY = "37662c76ffc19e5cd1b95f37d77155fc";

export class Search extends React.Component {

    constructor(props) {
        super(props);

        /**
         * Инициализиурем стейт компонента.
         */
        this.state = {
            format: null,               // Начальное состояние для фильтра 'Формат'.
            genre: null,                // Начальное состояние для фильтра 'Жанр'.
            year: null,                 // Начальное состояние для фильтра 'Год'.
            searchInput: null,          // Начальное состояние для фильтра 'Поиск по названию фильму'.
            result: []                  // Список отображаемых фильмов.
        }

        /**
         * Делаем привязку контекста для обработчиков событий.
         * "Зашиваем" в методы ссылку на текущий объект, чтобы в теле метода this ссылался на объект.
         */
        this.handleFormatChange = this.handleFormatChange.bind(this);
        this.handleGenreChange = this.handleGenreChange.bind(this);
        this.handleYearChange = this.handleYearChange.bind(this);
        this.handleSearchInputChange = this.handleSearchInputChange.bind(this);
        this.handleSearchButtonClick = this.handleSearchButtonClick.bind(this);
    }

    /**
     * Обработчик изменения значения в фильтре 'Формат'.
     */
    handleFormatChange(selectedOption) {
        // Фильтруем по формату.
        const resultArray = MOVIES.filter(
            (item) => item.format.indexOf(selectedOption.value) !== -1
        );

        this.setState({
            format: selectedOption,
            result: resultArray
        });
    }

    /**
     * Обработчик изменения значения в фильтре 'Жанр'.
     */
    handleGenreChange(selectedOption) {
        // Фильтруем по жанрам. Не забываем при этом, что жанров может быть много, они лежат в массиве.
        // Это не сильно усложняет условие фильтрации, ведь indexOf метод прекрасно работает как со строкой так и с массивом.
        const resultArray = MOVIES.filter(
            (item) => item.genre_ids.indexOf(selectedOption.value) !== -1
        );

        this.setState({
            genre: selectedOption,
            result: resultArray
        });
    }

    /**
     * Обработчик изменения значения в фильтре 'Год'.
     */
    handleYearChange(selectedOption) {

        // Фильтруем по году.
        const resultArray = MOVIES.filter(
            (item) => item.release_date.indexOf(selectedOption.value) !== -1
        );

        this.setState({
            year: selectedOption,
            result: resultArray
        });
    }

    /**
     * Обработчик изменения значения в поле 'Название фильма для поиска'.
     */
    handleSearchInputChange(event) {
        this.setState({
            searchInput: event.target.value
        });
    }

    /**
     * Обработчик нажатия на кнопку 'Поиск'.
     */
    handleSearchButtonClick() {
        // Для удобства выносим из стейта в отдельную переменную...
        // const searchInput = this.state.searchInput;

        // ...В ES6 появился специальный синтаксис: деструктуризация. Делаем тоже самое, что закоментированная строка выше.
        const { searchInput } = this.state;

        // Ajax запрос.
        axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=ru-RU&query=${searchInput}&page=1&include_adult=false`)
            // В then передаём функцию, которую необходимо выполнить после того, как сервер вернёт ответ.    
            .then((response) => {
                this.setState({
                    result: response.data.results
                });
            })
            .catch((error) => {
                console.log('Что-то пошло не так, а именно ' + error.message);
            });
    }

    render() {
        return (
            <Grid>
                {/* Фильтры. */}
                <Row className="show-grid">
                    <Col xs={3}>
                        <Select
                            name="format"
                            value={this.state.format}
                            onChange={this.handleFormatChange}
                            clearable={false}
                            options={[
                                { value: 'movie', label: 'Фильм' },
                                { value: 'tvseries', label: 'Сериал' },
                            ]}
                        />
                    </Col>
                    <Col xs={3}>
                        <Select
                            name="genre"
                            value={this.state.genre}
                            onChange={this.handleGenreChange}
                            clearable={false}
                            options={[
                                { value: 12, label: 'Приключения' },
                                { value: 16, label: 'Мультфильм' },
                                { value: 35, label: 'Комедия' },
                                { value: 53, label: 'Триллер' }
                                // При желании можете добавить и остальные жанры...
                                // 28	боевик
                                // 12	приключения
                                // 16	мультфильм
                                // 35	комедия
                                // 80	криминал
                                // 99	документальный
                                // 18	драма
                                // 10751	семейный
                                // 14	фэнтези
                                // 36	история
                                // 27	ужасы
                                // 10402	музыка
                                // 9648	детектив
                                // 10749	мелодрама
                                // 878	фантастика
                                // 10770	телевизионный фильм
                                // 53	триллер
                                // 10752	военный
                                // 37	вестерн
                            ]}
                        />
                    </Col>
                    <Col xs={3}>
                        <Select
                            name="year"
                            value={this.state.year}
                            onChange={this.handleYearChange}
                            clearable={false}
                            options={[
                                { value: '2010', label: '2010' },
                                { value: '2011', label: '2011' },
                                { value: '2012', label: '2012' },
                                { value: '2013', label: '2013' },
                                { value: '2014', label: '2014' },
                                { value: '2015', label: '2015' },
                                { value: '2016', label: '2016' },
                                { value: '2017', label: '2017' },
                                { value: '2018', label: '2018' },
                            ]}
                        />
                    </Col>
                    <Col xs={3}>
                        <FormGroup>
                            <InputGroup>
                                <FormControl type="text" onChange={this.handleSearchInputChange} />
                                <InputGroup.Button>
                                    <Button onClick={this.handleSearchButtonClick}>Search</Button>
                                </InputGroup.Button>
                            </InputGroup>
                        </FormGroup>
                    </Col>
                </Row>

                {/* Таблица. */}
                <Row>
                    <Col xs={12}>
                        <Table className="movies" bordered condensed hover>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Название</th>
                                    <th>Формат</th>
                                    <th>Дата релиза</th>
                                    <th>Рейтинг</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.result.map((item, index) => (
                                        <tr key={index}>
                                            <td className="poster-cell"><img src={`http://image.tmdb.org/t/p/w92/${item.poster_path}`} /></td>
                                            <td>{item.title}</td>
                                            <td>Кино</td>
                                            <td>{item.release_date}</td>
                                            <td>{item.vote_average}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Grid>

        )
    }
}