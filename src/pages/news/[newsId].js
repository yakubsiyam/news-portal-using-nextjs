import RootLayout from "@/components/Layouts/RootLayout";
import { Col, Image, Row } from "antd";
import { useRouter } from "next/router";
import {
  ArrowRightOutlined,
  CalendarOutlined,
  CommentOutlined,
  ProfileOutlined,
} from "@ant-design/icons";

const NewsDetailPage = ({ news }) => {
  const router = useRouter();
  const { userId } = router.query;

  console.log(typeof userId, "ami userId");

  if (!news) {
    return <p>loading.....</p>;
  }

  return (
    <div>
      <Row
        gutter={{
          xs: 8,
          sm: 16,
          md: 24,
          lg: 32,
        }}
      >
        <Col className="gutter-row" span={12}>
          <div>
            <Image
              src={news?.image_url}
              width={500}
              height={300}
              responsive
              alt="news image"
            />
          </div>
        </Col>
        <Col className="gutter-row" span={12}>
          <h1 style={{ fontSize: "30px" }}>{news?.title}</h1>
          <div
            className="line"
            style={{
              height: "5px",
              margin: "20px 0",
              background: "#000",
              width: "100%",
            }}
          ></div>

          <p
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              color: "gray",
              margin: "10px 0px",
              fontSize: "12px",
            }}
          >
            <span>
              <CalendarOutlined /> {news?.release_date}
            </span>
            <span>
              <CommentOutlined /> {news?.comment_count} COMMENTS
            </span>
            <span>
              <ProfileOutlined /> {news?.category}
            </span>
          </p>

          <p style={{ fontSize: "20px" }}>{news?.description}</p>
        </Col>
      </Row>
    </div>
  );
};

export default NewsDetailPage;

NewsDetailPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

// export const getStaticPaths = async () => {
//   const res = await fetch("http://localhost:5000/news");
//   const newses = await res.json();

//   const paths = newses.map((news) => ({
//     params: { newsId: news?.id },
//   }));

//   return {
//     paths,
//     fallback: false,
//   };
// };

export const getServerSideProps = async (context) => {
  const { params } = context;
  const res = await fetch(`http://localhost:5000/news/${params.newsId}`);
  const data = await res.json();

  return {
    props: {
      news: data,
    },
  };
};
