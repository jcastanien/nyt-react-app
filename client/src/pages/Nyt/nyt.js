import React from "react";
import Jumbotron from "../../components/Jumbotron";
import DeleteBtn from "../../components/DeleteBtn";
import SaveBtn from "../../components/SaveBtn";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, FormBtn } from "../../components/Form";

class Nyt extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nyt: [],
      result: [],
      savedArticles: [],
      topic: "",
      startYear: "",
      endYear: ""
    };
  }

  // When the component mounts, load all books and save them to this.state.books
  componentDidMount() {
    this.loadArticles();
  }




  handleFormSubmit = event => {
    event.preventDefault()

    API.searchArticles(this.state.topic, this.state.startYear, this.state.endYear)
      .then(res => {
        console.log(res.data.response.docs)
        this.setState({ nyt: res.data.response.docs})
        this.state.nyt.map(nyt => (
        this.saveArticle(nyt.headline.main, nyt.web_url)
        ))
      })
      .catch(err => console.log(err));
  };

      // When the form is submitted, use the API.saveBook method to save the book data
  // Then reload books from the database
  saveArticle = (title, url) => {
    API.saveArticle({
      title,
      url
    })
      .then(res => this.loadArticles()
    )
      .catch(err => console.log(err)
    );
};

  // Loads all books  and sets them to this.state.books
  loadArticles = () => {
    API.getArticles()
      .then(res => {
        this.setState({ 
          saved: res.data,
          topic: "",
          startYear: "",
          endYear: ""
        })
      })
      .catch(err => console.log(err));
  };

  // Deletes a book from the database with a given id, then reloads books from the db
  deleteArticles = id => {
    API.deleteArticles(id)
      .then(res => this.loadArticles())
      .catch(err => console.log(err));
  };

  loadSavedArticles = () => {
    API.getArticles()
    .then(res =>
      this.setState({ savedArticles: res.data},
        console.log(res.data))
    )
    .catch(err => console.log(err));
  };

  // Handles updating component state when the user types into the input field
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };


  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6 centered">
            <Jumbotron>
              <h1>What would you like to read about?</h1>
            </Jumbotron>
            <form>
              <Input
                value={this.state.topic}
                onChange={this.handleInputChange}
                name="topic"
                placeholder="Topic"
              />
              <Input
                value={this.state.startYear}
                onChange={this.handleInputChange}
                name="startYear"
                placeholder="Start Year"
              />
              <Input
                value={this.state.endYear}
                onChange={this.handleInputChange}
                name="endYear"
                placeholder="End Year"
              />
              <FormBtn
                // disabled={!(this.state.startYear && this.state.topic)}
                onClick={this.handleFormSubmit}
              >
                Submit
              </FormBtn>
            </form>
          </Col>
          </Row>
          <Row>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>New York Time's Articles</h1>
            </Jumbotron>
            {this.state.nyt.length ? (
              <List>
                {this.state.nyt.map(nyt => {
                  return (
                     <ListItem key={nyt._id}>

                        <strong>
                          {nyt.headline.main}
                        </strong>
                       {/* </a> */}
                       <SaveBtn onClick={() => this.saveArticle(nyt.headline.main, nyt.pub_date, nyt.web_url)} />
                       <DeleteBtn onClick={() => this.deleteArticles(nyt._id)} />
                     </ListItem>

                  );
                })}
              </List>
            ) : (
                <h3>No Results to Display</h3>
              )}
          </Col>
        </Row>
        <Row>
        <Col size="md-6 sm-12">
        <Jumbotron>
              <h1>Your Favorite Articles</h1>
            </Jumbotron>
            {this.state.nyt.length ? (
              <List>
                {this.state.savedArticles.map(nyt => {
                  return (
                     <ListItem key={nyt._id}>

                        <strong>
                          {nyt.headline.main}
                        </strong>
                       {/* </a> */}
                       <SaveBtn onClick={() => this.savedArticle(nyt.headline.main, nyt.pub_date, nyt.web_url)} />
                       <DeleteBtn onClick={() => this.deleteArticles(nyt._id)} />
                     </ListItem>

                  );
                })}
              </List>
            ) : (
                <h3>No Results to Display</h3>
              )}
              </Col>
          </Row>
      </Container>
    );
  }
}

export default Nyt;
