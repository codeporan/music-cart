import React, { Component } from "react";
import Dropzone from "react-dropzone";
import axios from "axios";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faPlusCircle from "@fortawesome/fontawesome-free-solid/faPlusCircle";
import circularProgress from "@material-ui/core/CircularProgress";
class Addfileupload extends Component {
  state = {
    uploadedFiles: [],
    uploading: false
  };
  //   onDrop = files => {
  //     this.setState({
  //       uploading: true
  //     });
  //     let formdata = new FormData();
  //     const config = {
  //       header: {
  //         "content-type": "multipart/form-data"
  //       }
  //     };
  //     formdata.append("file", files[0]);
  //     axios.post("/api/v1/uploadimage", formdata, config).then(
  //       response => {
  //         this.setState({
  //           uploading: false,
  //           file: [...this.state.file, response.data]
  //         });
  //       },
  //       () => this.props.imagesHandler(this.state.file)
  //     );
  //     console.log(files);
  //   };

  onDrop = files => {
    console.log(files);
    // this.setState({ uploading: true });
    // let formData = new FormData();
    // const config = {
    //   header: { "content-type": "multipart/form-data" }
    // };
    // formData.append("file", files[0]);
    // axios.post("/api/v1/uploadimage", formData, config).then(response => {
    //   console.log(response.data);
    //   this.setState(
    //     {
    //       uploading: false,
    //       uploadedFiles: [...this.state.uploadedFiles, response.data]
    //     },
    //     () => {
    //       this.props.imagesHandler(this.state.uploadedFiles);
    //     }
    //   );
    // });
  };

  onRemove = () => {};
  //   showUploadedImages = () =>
  //     this.state.file.map(item => (
  //       <div
  //         key={item.public_id}
  //         onClick={() => this.onRemove(item.public_id)}
  //         className="dropzone_box"
  //       >
  //         <div
  //           className="wrap"
  //           style={{
  //             background: `url(${item.url} no-repeat)`
  //           }}
  //         />
  //       </div>
  //     ));
  render() {
    return (
      <div>
        <section>
          <div className="dropzone clear">
            <Dropzone
              onDrop={e => this.onDrop(e)}
              multiple={false}
              className="dropzone_box"
            >
              <div className="wrap">
                <FontAwesomeIcon icon={faPlusCircle} />
              </div>
            </Dropzone>
            {/* {this.showUploadedImages()} */}
            {/* {this.state.uploading ? (
              <div
                className="dropzone_box"
                style={{ textAlign: "center", paddingTop: "60px" }}
              >
                <circularProgress />
              </div>
            ) : null} */}
          </div>
        </section>
      </div>
    );
  }
}
export default Addfileupload;
