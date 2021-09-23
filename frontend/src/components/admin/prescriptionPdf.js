import React from "react";
import "../../assets/scss/prescriptionPdf.scss";
import { Preview, print } from "react-html2pdf";
import ReactToPdf from "react-to-pdf";
import { useSelector } from "react-redux";

const PrescriptionPdf = ({ medicine_list_, data }) => {
  let medicine_list = medicine_list_ ? medicine_list_ : [];

  const options = {
    orientation: "landscape",
    unit: "in",
    // format: [4, 2],
  };

  const ref = React.createRef();

  const patient_name = data.customer_name ? data.customer_name : "Undefined";
  const patient_mobile = data.mobile ? data.mobile : "xxxx.xxxx.xx";

  const doctorInfo = useSelector((state) => state.Auth.user);

  const clinic_name = doctorInfo.clinic_name;
  const doctor_name = doctorInfo.full_name;

  const address1 = doctorInfo.address_line1 ? doctorInfo.address_line1 : "";
  const address2 = doctorInfo.address_line2 ? doctorInfo.address_line2 : "";

  const fullAdress = address1 + "\n" + address2;

  console.log(data);
  return (
    <div className="col-sm-12 prescription-pdf" ref={ref}>
      <div className="pdf-header" id={"pdf-header"}>
        <div className="clinic-name" id="clinic-name">
          {clinic_name}
        </div>
        <div className="doctor-name">{doctor_name}</div>
        <div className="registration-no">13232442</div>
      </div>

      <div className="patient-details col-sm-4">
        <h6>TO</h6>
        <h5>{patient_name}</h5>
        <div className="personal-info col-sm-12 row">
          <div className="dob col-sm-6">
            <span>DOB :</span> x.x.2005
          </div>
          <div className="age col-sm-6">
            <span>Age :</span> 34
          </div>
          <div className="mobile-no">
            <span>Mobile no :</span> {patient_mobile}
          </div>
        </div>
      </div>

      <div className="medicine-list-cards col-sm-12 row">
        <div className="col-sm-12 row">
          {medicine_list.map((prescription) => {
            const prescription_name = prescription.name
              ? prescription.name
              : prescription.medicine_name;

            const drug_to_taken = prescription.drug_to_taken;
            return (
              <div
                className="row col-sm-12"
                style={{ justifyContent: "space-between" }}
              >
                {" "}
                <div className="medicine-name col-sm-5">
                  <span> Medicine NAME</span> : <p>{prescription_name}</p>
                </div>
                <div className="directions_of_intake col-sm-5">
                  <span>Directions of Intake </span> :<p>{drug_to_taken}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <footer>
        <div className="pdf-footer">{fullAdress}</div>
      </footer>

      <ReactToPdf
        targetRef={ref}
        filename="div-blue.pdf"
        options={options}
        x={0.5}
        y={0.5}
        scale={0.8}
      >
        {({ toPdf }) => (
          <button onClick={toPdf} className="generatePdfBtn">
            Generate pdf
          </button>
        )}
      </ReactToPdf>
    </div>
  );
};

export default PrescriptionPdf;
