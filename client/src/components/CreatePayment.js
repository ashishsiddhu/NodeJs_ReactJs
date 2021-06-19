import React, {Component} from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../actions/userActions';
import * as paymentActions from '../actions/paymentActions';

class CreatePayment extends Component {
    constructor(props) {
        super(props);

        this.state = {
            sender:"",
            receiver: "",
            amount: "",
            currency: ""

        };
        this.handleChange = this.handleChange.bind(this);
        this.currencyChange = this.currencyChange.bind(this);
        this.amountChange = this.amountChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    componentDidMount() {
        this.props.userActions.getUsers();
    }

    handleChange(event) {
        const index = event.target.selectedIndex;
        const optionElement = event.target.childNodes[index];
        const optionElementId = optionElement.getAttribute('id');
        event.target.name === "sender" ? 
            this.setState({
                sender: { id: Number(optionElementId), name: optionElement.textContent},
                success: false}) : 
            this.setState({
                receiver: { id: Number(optionElementId), name: optionElement.textContent},
                success: false});
    }

    senderOptions() {
        const { usersList } = this.props;
        if (typeof usersList.users !== "object") return false;
        return (
            <select className="form-control" name="sender" onChange={this.handleChange} defaultValue={'DEFAULT'} 
                ref={(ref) => this.senderRef= ref}>
                <option value="DEFAULT" disabled hidden>Choose sender name</option>
                {usersList.users.map(data => {
                    return (
                        <option key={data.id} name="sender" id={data.id} value={data.id}>{data.name}</option>
                    )
                })}
            </select>
        )
    }
    
    receiverOptions() {
        const { usersList } = this.props;
        if (typeof usersList.users !== "object") return false;
        return (
            <select className="form-control" name="receiver" onChange={this.handleChange} defaultValue={'DEFAULT'} 
                ref={(ref) => this.receiverRef= ref}>
                <option value="DEFAULT" disabled hidden>Choose receiver name</option>
                {usersList.users.map(data => {
                    return (
                        <option key={data.id} name="receiver" id={data.id} value={data.id}>{data.name}</option>
                    )
                })}
            </select>
        )
    }

    currencyChange = (event) => {
        this.setState({...this.state, currency: event.target.value ,success: false});
    }
    
    amountChange = (event) => {
        this.setState({...this.state, amount: event.target.value ,success: false});
    }

    componentDidUpdate() {
        console.log(this.props);
    }
    onFormSubmit = (e) => {
        e.preventDefault();
        let data = {...this.state}
        let nowMS = new Date();
        let epochSeconds = Math.round(nowMS.getTime() / 1000);
        let now = new Date(epochSeconds * 1000);
        let date = now.toISOString()
        data.date = date;
        let id = Math.round(Math.random()*1e16)+"";
        let newObj = Object.assign({id: id}, data);
        if(this.state.receiver === "" || this.state.sender === "" || this.state.currency === "" || this.state.amount === "") {
            this.setState({...this.state, error: "Please fill form"});
            return false;
        } else if (data.receiver.id === data.sender.id) {
            this.setState({...this.state, error: "The sender and receiver must be different"});
            return false;
        }
        this.props.paymentAction.setPayment(newObj)
        this.state = {
            sender:"",
            receiver: "",
            currency: "",
            amount: ""
        };
        this.amountInput.value = "";
        this.currencyRef.value = "";
        this.senderRef.value = "";
        this.receiverRef.value = "";
        this.setState({...this.state, 
            success: true,
            error:false
        });
      
    }
    displayError() {
        if(!this.state.error || this.state.success) return false;
        return (
            <div className="alert alert-danger col-md-6 col-md-offset-3">
                <strong>Error!</strong> {this.state.error}
            </div>
        )
    }
    displaySuccess() {
        if(!this.state.success || this.state.error) return false;
        return (
            <div className="alert alert-success col-md-8 col-md-offset-2">
                <strong>Success!</strong> Payment added successfully, Please review under "Statement" tab.
            </div>
        )
    }
    render() {
      return (
        <div className="content-panel">
        <h3 className="font-weight-bold mt-0 mb-4">Payment</h3>
        <div className="billing">
            <div className="secure text-center margin-bottom-md">
                <h3 className="margin-bottom-md text-success">
                    <span className="fs1 icon" aria-hidden="true" data-icon=""></span>
                    Make Payment<br />
                </h3>
                <br></br>
            </div>
            <form id="billing" className="form-horizontal" onSubmit={this.onFormSubmit} role="form">
                <div className="row">
                    {this.displaySuccess()}
                    {this.displayError()}
                </div>
                <div className="form-group">
                    <label className="col-sm-3 control-label">Sender's Name</label>
                    <div className="col-sm-9 form-inline">
                        {this.senderOptions()}
                        <p className="help-block">Please select Sender's Name</p>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-3 control-label">Receiver's Name</label>
                    <div className="col-sm-9 form-inline">
                        {this.receiverOptions()}
                        <p className="help-block">Please select Receiver's Name</p>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-3 control-label">Currency</label>
                    <div className="col-sm-9 form-inline">
                        <select className="form-control" onChange={this.currencyChange} defaultValue={'DEFAULT'} ref={(ref) => this.currencyRef= ref}>
                            <option value="DEFAULT" disabled hidden>Choose currency</option>
                            <option value="BTC">BTC</option>
                            <option value="EUR">EUR</option>
                            <option value="GBP">GBP</option>
                            <option value="JPY">JPY</option>
                            <option value="USD">USD</option>
                        </select>
                        <p className="help-block">Please select Currency</p>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-3 control-label">Amount</label>
                    <div className="col-sm-9">
                        <input type="number" className="form-control" style={{width: "120px"}} placeholder="amount" 
                        onChange={this.amountChange} ref={(ref) => this.amountInput= ref}/>
                        <p className="help-block">Please select Amount</p>
                    </div>
                </div>
                <hr></hr>
                <div className="action-wrapper text-center">
                    <div className="action-btn">
                        <button className="btn btn-success btn-lg" type="submit" disabled={this.state.success}>
                            Make Payment
                            <i className="fa fa-chevron-right"></i>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
      );
    }
  };


function mapStateToProps(state) {
    return {
        usersList: state.users
    };
}

function mapDispatchToProps(dispatch) {
    return {
        userActions: bindActionCreators(userActions, dispatch),
        paymentAction: bindActionCreators(paymentActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePayment);