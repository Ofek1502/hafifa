import "./SuccessfulNotific.css";

const SuccessfulNotific = ({ messege }) => {
  return (
    <div
      className={
        messege.messege
          ? messege.success === true
            ? "successful"
            : "unSuccessful"
          : ""
      }
    >
      {messege.messege}
    </div>
  );
};

export default SuccessfulNotific;
