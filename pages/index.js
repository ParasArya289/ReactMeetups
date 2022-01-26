import Head from "next/head";
import { MongoClient } from "mongodb";

import MeetupList from "../components/meetups/MeetupList";
import { Fragment } from "react";

function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
      </Head>
      <MeetupList meetups={props.meetups} />;
    </Fragment>
  );
}

// export async function getServerSideProps(context) {
//     const req = context.req;
//     const res = context.res;
//     return {
//         props: {
//             meetups: DUMMY_MEETUPS
//         },
//     };
// }

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://paras:paras123@cluster0.9o946.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find().toArray();
  client.close();

  return {
    props: {
      meetups: meetups.map((meetups) => ({
        title: meetups.title,
        address: meetups.address,
        image: meetups.image,
        id: meetups._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

export default HomePage;
