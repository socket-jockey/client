import React from 'react';
import { Link } from 'react-router-dom';
import styles from './RoomsPage.css';


const RoomSelectionPage = () => {
  return (
    <article>
      <Link to="/rooms/solo">
        <section
          // onClick={() => setRoom('solo')}
          className={styles.soloContainer}
        >
          <img
            src="/solo.png"
            alt="solo world experience"
            className={styles.soloImage}
          />
        </section>
      </Link>
      <Link to="/rooms/collab">
        <section
          // onClick={() => setRoom('collab')}
          className={styles.collabContainer}
        >
          <img
            src="/collab.png"
            alt="collaborative world experience"
            className={styles.collabImage}
          />
        </section>
      </Link>
    </article>
  );
};

export default RoomSelectionPage;
