import React from 'react';
import axios from 'axios';

class BookRide extends React.Component {
    state = {
        availablerides: [],
        bookingStatus: {},
        isbookingDone: null,
        isshowAllRidesClicked: null,
        isFiltered: null,
        selectedRide: null
    }

    componentDidMount() {

    }

    onShowAllRides = (event) => {
        event.preventDefault();
        axios.get('http://localhost:3001/show_rides')
            .then(res => {
                if (this.state.isshowAllRidesClicked === null || this.state.isFiltered)
                    this.setState({ availablerides: res.data, isshowAllRidesClicked: true });
                else
                    this.setState({ availablerides: res.data, isshowAllRidesClicked: !(this.state.isshowAllRidesClicked) });

                console.log(this.state);
            })
    }

    onBookaRide = (event) => {
        event.preventDefault();
        var book = {}
        book._id = this.state.selectedRide._id;
        book.name = this.state.selectedRide.name;
        book.pickUp = this.state.selectedRide.pickUp;
        book.destination = this.state.selectedRide.destination;
        book.car = this.state.selectedRide.car;
        book.seatsLeft = this.state.selectedRide.seatsLeft;
        book.id = this.state.selectedRide.id;
        book.__v = 0
        var bookpayload = {};
        bookpayload.rider = book;
        bookpayload.ridee = 'admin'; // replace by logged in user
        console.log(bookpayload);
        axios.post('http://localhost:3001/book_ride', bookpayload)
            .then(res => {
                this.setState({ bookingStatus: res.data });
                if (res.data.status == 200) { this.setState({ isbookingDone: true }); }
                console.log(this.state.isbookingDone);
                console.log(this.state.bookingStatus);
            });
    }


    onSelectRide = (ride) => {
        // console.log(ride);
        this.setState({ selectedRide: ride }, () => { console.log(this.state.selectedRide) });
        //console.log('ride:', ride);
    }

    toOfficeRides = () => {
        if (this.state.availablerides !== null) {
            var toOfficeRides = this.state.availablerides.filter(ride => ride.destination == 'MNG SEZ' || ride.destination == 'MNG STP');
            this.setState({ availablerides: toOfficeRides, isFiltered: true });
        }
    }

    fromOfficeRides = () => {
        if (this.state.availablerides !== null) {
            var toOfficeRides = this.state.availablerides.filter(ride => ride.pickUp == 'MNG SEZ' || ride.pickUp == 'MNG STP');
            this.setState({ availablerides: toOfficeRides, isFiltered: true });
        }
    }
    render() {

        return (
            <div>
                <div className="panel panel-primary" style={{ width: 800, verticalAlign: 'center' }}>
                    <div className="panel-heading">Book a Ride</div>
                    <div className="panel-body">
                        <div style={{ fontFamily: 'arial' }}>
                            <p> Pool Carz is an online application which enables users to share rides with others. You can either book a rides
                                or offer a ride. Did we mention this app is advertisement free? To add on top of that, its free of cost! So what
                        are you waiting for? Check out the rides available and start PCing!! </p>
                        </div>

                        {this.state.isshowAllRidesClicked ?
                            <div style={{ textAlign: 'center', fontFamily: 'arial' }}>
                                <span>Please choose a ride!</span>
                            </div> : null}

                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <button className="btn btn-primary" style={{ margin: 5 }} onClick={this.onShowAllRides}>Show All Rides</button>
                            {this.state.isshowAllRidesClicked ?
                                <div>
                                    <button className="btn btn-primary" style={{ margin: 5 }} onClick={this.toOfficeRides} >To office</button>
                                    <button className="btn btn-primary" style={{ margin: 5 }} onClick={this.fromOfficeRides}>From office</button>
                                    <button className="btn btn-primary" style={{ margin: 5 }} >Others</button>
                                </div>
                                : null}

                        </div>
                        {this.state.isshowAllRidesClicked ?
                            <div>
                                <div style={{ display: 'flex', justifyContent: 'left' }}>
                                    <table className="table table-bordered" style={{ fontFamily: 'arial', textAlign: 'center' }}>
                                        <thead >
                                            <tr>
                                                <th style={{ fontFamily: 'arial', textAlign: 'center' }}>Start Point</th>
                                                <th style={{ fontFamily: 'arial', textAlign: 'center' }}>End Point</th>
                                                <th style={{ fontFamily: 'arial', textAlign: 'center' }}>Seats available</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.availablerides.map(ride => {
                                                return (
                                                    // inline function call as need to pass in tr bound object to the function call
                                                    <tr className="clickable-row" onClick={() => this.onSelectRide(ride)} >
                                                        <td>{ride.pickUp}</td>
                                                        <td>{ride.destination}</td>
                                                        <td>{ride.seatsLeft}</td>
                                                    </tr>
                                                );
                                            })}

                                        </tbody>
                                    </table>
                                </div>
                                <span style={{ display: 'flex', justifyContent: 'center', fontFamily: 'arial' }}>Rider Details </span>
                                <div style={{ display: 'flex', justifyContent: 'left', flexDirection: 'column' }}>
                                    {this.state.selectedRide ?

                                        <table className="table table-bordered" style={{ fontFamily: 'arial', textAlign: 'center' }}>
                                            <thead >
                                                <tr>
                                                    <th style={{ fontFamily: 'arial', textAlign: 'center' }}>Id</th>
                                                    <th style={{ fontFamily: 'arial', textAlign: 'center' }}>Name</th>
                                                    <th style={{ fontFamily: 'arial', textAlign: 'center' }}>Car</th>
                                                    <th style={{ fontFamily: 'arial', textAlign: 'center' }}>Seats Left</th>
                                                    <th style={{ fontFamily: 'arial', textAlign: 'center' }}>Pickup</th>
                                                    <th style={{ fontFamily: 'arial', textAlign: 'center' }}>Destination</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>{this.state.selectedRide.id}</td>
                                                    <td>{this.state.selectedRide.name}</td>
                                                    <td>{this.state.selectedRide.car}</td>
                                                    <td>{this.state.selectedRide.seatsLeft}</td>
                                                    <td>{this.state.selectedRide.pickUp}</td>
                                                    <td>{this.state.selectedRide.destination}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        : null}
                                    {
                                        (this.state.isbookingDone && this.state.isbookingDone !== null) ?
                                            <div style={{ display: 'flex', justifyContent: 'center',flexDirection:'column' }} >
                                                <span className={{ display: 'flex', justifyContent: 'center' }}>Booking done. Your booking id is {this.state.bookingStatus.id}</span>
                                                <button className="btn btn-danger" >Cancel Ride</button>
                                            </div> :
                                            <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }} >
                                                <button className="btn btn-primary" onClick={this.onBookaRide}>Book!</button>
                                            </div>
                                    }
                                </div>
                            </div> : null}


                        {/* <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <button className="btn btn-primary"
                                style={{ margin: 5 }}

                            >Offer a Ride</button>
                        </div> */}
                    </div>
                </div>

            </div>
        );
    }
}

export default BookRide;