import React, { useState } from "react";
/*lo sacamos de la documentacion de firebase subida de archivos */
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { addProduct } from "../../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import "./newProduct.css";

export default function NewProduct() {
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const [categories, setCat] = useState([]);
  /*estamos usando redux para poder optener el token*/
  const token = useSelector((state) => state.user.currentUser.accessToken);
  const dispatch = useDispatch();

  /*otra forma de poder leer varios inputs a la vez */
  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleCategory = (e) => {
    setCat(e.target.value.split(","));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    /*hacer un pequeño hash al nombre de la imagen */
    const fileName = new Date().getTime + file.name;
    /*vamos a usar los metodos que copiamos de la documentacion */
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
        }
      },
      (error) => {
        // Handle unsuccessful uploads
        console.log(error);
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          /*
           *Aqui nos regresa la url de la imagen ya una vez en firebase,
           *y juntamos todos los demas elementos del form en un objeto para enviarlo a la db  */
          const product = { ...inputs, img: downloadURL, categories };
          addProduct(product, dispatch, token);
        });
      }
    );
  };
  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm" onSubmit={handleSubmit}>
        <div className="addProductItem">
          <label>Image</label>
          <input
            type="file"
            id="file"
            /*Aqui le estamos diciendo que tome el archivo pero solo 1 por eso es [0],
            podemos imprimir la variable de file para ver el objeto que regresa */
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <div className="addProductItem">
          <label>Title</label>
          <input
            type="text"
            placeholder="Apple Airpods"
            onChange={handleChange}
            name="title"
          />
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input
            type="text"
            placeholder="Description..."
            onChange={handleChange}
            name="description"
          />
        </div>
        <div className="addProductItem">
          <label>Price</label>
          <input
            type="number"
            placeholder="Price"
            onChange={handleChange}
            name="price"
          />
        </div>
        <div className="addProductItem">
          <label>Category</label>
          <input type="text" placeholder="Category" onChange={handleCategory} />
        </div>
        <div className="addProductItem">
          <label>Stock</label>
          <select onChange={handleChange} name="inStock">
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <button type="submit" className="addProductButton">
          Create
        </button>
      </form>
    </div>
  );
}
