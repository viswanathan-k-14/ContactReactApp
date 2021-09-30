import React, { useContext, useEffect, Fragment } from 'react';
import ContactItem from './ContactItem';
import ContactContext from '../../context/contact/ContactContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Spinner from '../layouts/Spinner';
const Contacts = () => {
  const contactContext = useContext(ContactContext);
  const { contacts, filtered, getContacts, loading } = contactContext;
  useEffect(() => {
    getContacts();
  }, []);
  if (contacts !== null && contacts.length === 0 && !loading) {
    return <h4>No contacts found ! Please add one !</h4>;
  }
  return (
    <Fragment>
      {contacts !== null && !loading ? (
        <TransitionGroup>
          {filtered !== null
            ? filtered.map((contact) => {
                return (
                  <CSSTransition
                    key={contact._id}
                    timeout={500}
                    classNames='item'
                  >
                    <ContactItem contact={contact} />
                  </CSSTransition>
                );
              })
            : contacts.map((contact) => {
                return (
                  <CSSTransition
                    key={contact._id}
                    timeout={500}
                    classNames='item'
                  >
                    <ContactItem contact={contact} />
                  </CSSTransition>
                );
              })}
        </TransitionGroup>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Contacts;
