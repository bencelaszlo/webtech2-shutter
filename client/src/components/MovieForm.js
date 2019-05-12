import React from 'react'
import MovieActions from "../actions/MovieActions";
import MovieStore from "../store/MovieStore";

class MovieForm extends React.Component{

    constructor(props) {
        super(props);
        // MovieActions.fetchRatings();
        //MovieActions.fetchCategories();
        this._onChange = this._onChange.bind(this);
        this.state = {
            ratings : MovieStore._ratings,
            categories : MovieStore._categories,
            movie : {
                title : "",
                rating : "",
                category : "",
                description : "",
                length : 0,
                rentalDuration : 0,
                replacementCost : 0,
                specialFeatures: "",
            }
        }

    }

    _onChange() {
        this.setState({categories : MovieStore._categories});
    }

    componentDidMount(){
        MovieStore.addChangeListener(this._onChange)
    }

    componentWillUnmount(){
        MovieStore.removeChangeListener(this._onChange)
    }

    render(){
        return(
            <div className="row">
                <div className="col-12">
                    <div className="row">
                        <div className="col-4">Title</div>
                        <div className="col-8">
                            <input
                                onChange={(event)=>{
                                    this.state.movie.title = event.target.value
                                    this.setState({movie : this.state.movie});
                                }}
                                type="text"/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-4">Rating</div>
                        <div className="col-8">
                            <select
                                onChange={(event)=>{
                                    this.state.movie.rating = event.target.value
                                    this.setState({movie : this.state.movie});
                                }}
                            >
                                <option defaultValue={null} label="---"></option>
                                {this.state.ratings.map((rating)=>{
                                    return (
                                        <option key={rating} value={rating}>
                                            {rating}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-4">Category</div>
                        <div className="col-8">
                            <select defaultValue="Category"
                                onChange={(event)=>{
                                    this.state.movie.category = event.target.value
                                    this.setState({movie : this.state.movie});
                            }}>
                                <option defaultValue={null} label="---"></option>
                                {this.state.categories.map((category)=>{
                                    return (
                                        <option key={category} value={category}>
                                            {category}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-4">Description</div>
                        <div className="col-8">
                            <input
                                onChange={(event)=>{
                                    this.state.movie.description = event.target.value
                                    this.setState({movie : this.state.movie});
                                }}
                                type="text"/>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-4">Length</div>
                        <div className="col-8">
                            <input
                                onChange={(event)=>{
                                    this.state.movie.length = event.target.value
                                    this.setState({movie : this.state.movie});
                                }}
                                type="number"/>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-4">Rental Duration</div>
                        <div className="col-8">
                            <input
                                onChange={(event)=>{
                                    this.state.movie.rentalDuration = event.target.value
                                    this.setState({movie : this.state.movie});
                                }}
                                type="number"/>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-4">Replacement Cost</div>
                        <div className="col-8">
                            <input
                                onChange={(event)=>{
                                    this.state.movie.replacementCost = event.target.value
                                    this.setState({movie : this.state.movie});
                                }}
                                type="number"/>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-4">Special Features</div>
                        <div className="col-8">
                            <input
                                onChange={(event)=>{
                                    this.state.movie.specialFeatures = event.target.value
                                    this.setState({movie : this.state.movie});
                                }}
                                type="text"/>
                        </div>
                    </div>

                    <button
                        onClick={()=>{MovieActions.addMovie(this.state.movie)}}
                        className="btn btn-success">
                        Add
                    </button>
                </div>
            </div>
        );
    }
}

export default MovieForm