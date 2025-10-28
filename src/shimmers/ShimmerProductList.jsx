import { Button, Card, Row, Col, Form } from "react-bootstrap";

export function ShimmerProductList() {
  return (
    <div className="d-block gap-20 dynamic-content ">
      <div
        style={{
          padding: "10rem",
          border: "1px solid #eee",
          background: "#f6f7f8",
          backgroundImage:
            "linear-gradient(to right, #f6f7f8 0%, #edeef1 20%, #f6f7f8 40%, #f6f7f8 100%)",
          backgroundSize: "18rem 18rem",
          animation: "shimmer 3s infinite linear",
        }}
      >
        {" "}
        {/* <div style={{ height: '20px', width: '150px', backgroundColor: '#ddd' }}></div> */}
        <style>{`
      @keyframes shimmer {
        0% { background-position: -800px 0; }
        100% { background-position: 800px 0; }
      }
    `}</style>
      </div>

      <div
        style={{
          padding: "10rem",
          border: "1px solid #eee",
          background: "#f6f7f8",
          backgroundImage:
            "linear-gradient(to right, #f6f7f8 0%, #edeef1 20%, #f6f7f8 40%, #f6f7f8 100%)",
          backgroundSize: "18rem 18rem",
          animation: "shimmer 3s infinite linear",
        }}
      >
        {" "}
        {/* <div style={{ height: '20px', width: '150px', backgroundColor: '#ddd' }}></div> */}
        <style>{`
         @keyframes shimmer {
           0% { background-position: -800px 0; }
           100% { background-position: 800px 0; }
         }
       `}</style>
      </div>
    </div>
  );
}
