import React, { Component } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as paymentActions from '../actions/paymentActions';

class PaymentDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            paymentData: {
                sender: { name: null },
                receiver: { name: null },
                date: null,
                amount: null,
                currency: null,
            },
            errorMessage: {}
        }
    }
    
    transactionsDetail(){
        const { payment } = this.props;
        return (
            <tbody>
                {payment.map((data, i) => {
                    return (
                        <tr key={i}>
                            <td>{data.sender}</td>
                            <td>{data.receiver}</td>
                            <td>{data.amount}</td>
                            <td>{data.currency}</td>
                        </tr>

                    )
                })}
            </tbody>
        )
    }

    render() {
        return (
            <div>
                <div className="content-panel">
                    <div className="tab-content" id="myTabContent">
                    <div className="tab-pane active show" id="payments" role="tabpanel" aria-labelledby="payments-tab">
                        <h4 className="font-weight-bold mt-0 mb-4">Recent Transactions</h4>
                        <div className="table-responsive">
                        <table className="table table-hover mb-0">
                            <thead>
                                <tr className="align-self-center">
                                    <th>Sender's Name</th>
                                    <th>Receiver's Name</th>
                                    <th>Amount</th>
                                    <th>Currency</th>
                                </tr>
                            </thead>
                            {this.transactionsDetail()}
                        </table>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        )
    }


}

function mapStateToProps(state) {
    return {
        payment: state.payment,
        
    };
}

function mapDispatchToProps(dispatch) {
    return {
        paymentAction: bindActionCreators(paymentActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentDetails);