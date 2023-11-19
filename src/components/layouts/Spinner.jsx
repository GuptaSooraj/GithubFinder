// import spinner from "../../assets/spinner.gif";
// import spinner0 from "../../assets/spinner0.gif";
// import "../../loader.css";
import "../../index.css";

function Spinner() {
  return (
    <div className="flex justify-center items-center">
      <div className="lds-ring mx-auto text-center">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
// function Spinner() {
//   return (
//     <div className="w-100 mt-20">
//       <img
//         width={180}
//         className="text-center mx-auto"
//         // src={spinner}
//         src={spinner0}
//         alt="Loading..."
//       />
//     </div>
//   );
// }

export default Spinner;
