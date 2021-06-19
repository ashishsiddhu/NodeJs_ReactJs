import React, {Component} from 'react';
import PaymentDetails from "./PaymentDetails";
import CreatePayment from "./CreatePayment";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as paymentActions from '../actions/paymentActions';

class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            links: [
              {
                id: 1,
                name: " My Profile",
                to: "/cms",
                className: "fa fa-user"
              },
              {
                id: 2,
                name: " Payment",
                to: "/cms",
                className: "fa fa-credit-card"
              },
              {
                id: 3,
                name: " Statement",
                to: "/cms",
                className: "fa fa-th"
              }
            ],
            activeLink: 2
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick = id => {
        this.setState({ activeLink: id });
    };

    profileDetail() {
        return (
            <div className="content-panel">
                <h3 className="font-weight-bold mt-0 mb-4">Profile</h3>
                <div className="billing">
                    <div className="secure text-center margin-bottom-md">
                        <h3 className="margin-bottom-md text-success">
                            <span className="fs1 icon" aria-hidden="true" data-icon=""></span>
                                                Ashish Siddhu<br />
                            <small>Senior Software Developer</small>
                        </h3>
                    </div>
                </div>
            </div>
        )
    }

    determineContent() {
        switch(this.state.activeLink) {
          case 1:
            return this.profileDetail();
          case 2:
            return <CreatePayment />;
          case 3:
            return <PaymentDetails/>;
          default:
            return this.profileDetail();
        }
    }

    sideNavbar(){
        const { links, activeLink } = this.state;
        
        return (
            <nav className="side-menu">
                {links.map(link => {
                    return (
                        <ul className="nav" key={link.id}>
                            <li onClick={() => this.handleClick(link.id)}
                                className={
                                    (link.id === activeLink ? " active" : "")
                                }>
                                <a href="#"><span className={link.className}></span>{link.name} </a>
                            </li>
                        </ul>

                    )
                })}
            </nav>
        )
    }

    mainContent() {
        return (
            <section className="module">
                <div className="module-inner">
                    <div className="side-bar">
                        <div className="user-info">
                            <img className="img-profile img-circle img-responsive center-block profile-image" alt="" />
                            <ul className="meta list list-unstyled">
                                <li className="name">
                                    <p className="font-weight-bold">Ashish Siddhu</p>
                                    <label className="label label-info">Software Developer</label>
                                </li>
                                <li className="email">ashishsiddhu4@gmail.com</li>
                            </ul>
                        </div>
                        {this.sideNavbar()}
                    </div>
                    {this.determineContent()}
                </div>
            </section>
        )
    }

    componentDidMount() {
        this.props.paymentAction.loadPaymentData(() => {
        });
        this.props.paymentAction.getPayment(() => {
        });
    }
    render() {
        return (
            <div className="view-account">
                {this.mainContent()}
            </div>
        );
    }
};

function mapDispatchToProps(dispatch) {
    return {
        paymentAction: bindActionCreators(paymentActions, dispatch),
    };
}

export default connect(null, mapDispatchToProps)(Profile);