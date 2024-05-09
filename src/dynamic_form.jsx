import "./App.css";
import { useState, useEffect } from "react";


function Form() {
 
  let [formfields, setFormFields] = useState([
    {
      product: "",
      quantity: 0,
      price: 0,
      tax: 0,
      discount: 0,
      discount_reduction: "flat",
      total: 0,
    },
  ]);
  let [vat, setVat] = useState(0);
  let sub_total = 0;
  let gross_total = 0;
  const validNumber = new RegExp("^[0-9]*$");

  let handlePrice = (event, index) => {
    if (validNumber.test(event.target.value) == true) {
      let data = [...formfields];
      data[index].price = event.target.value;
      setFormFields(data);
    }
  };
  let handleQuantity = (event, index) => {
    if (validNumber.test(event.target.value) == true) {
      let data = [...formfields];
      data[index].quantity = event.target.value;
      setFormFields(data);
    }
  };
  let handleTax = (event, index) => {
    // const validNumber = new RegExp("^[0-9]*$");
    // console.log(validNumber.test(event.target.value));
    // (event.target.value.replace(/^[0-9]*$/gi, ""));
    let data = [...formfields];
    data[index].tax = event.target.value;
    setFormFields(data);
  };
  let handleDiscount = (event, index) => {
    if (validNumber.test(event.target.value) == true) {
      let data = [...formfields];
      data[index].discount = event.target.value;
      setFormFields(data);
    }
  };
  let Add_Items = () => {
    let more_field = {
      product: "",
      quantity: 0,
      price: 0,
      tax: 0,
      discount: 0,
      discount_reduction: "flat",
      total: "",
    };
    setFormFields([...formfields, more_field]);
  };

  let Remove_Row = (event, index) => {
    let remove = formfields.splice(index, 1);

    setFormFields([...formfields], remove);
  };

  for (let i = 0; i < formfields.length; i++) {
    sub_total =
      sub_total + Number(formfields[i].price * formfields[i].quantity);
    gross_total = gross_total + Number(formfields[i].total);
    gross_total = gross_total > 0 ? gross_total : 0;
  }
  return (
    <div className="App">
      <div className="m-5">
        
        <form>
          {" "}
          {/*  form  tag is not anything work */}
          <table className="table table-bordered ">
            <thead>
              <tr>
                <th scope="col" className="text-center">
                  #
                </th>
                <th scope="col" className="text-center">
                  Product
                </th>
                <th scope="col" className="text-center">
                  Price
                </th>
                <th scope="col" className="text-center">
                  Quantity
                </th>
                <th scope="col" className="text-center">
                  Discount
                </th>
                {/* <th scope="col" className="text-center">Tax</th> */}
                <th scope="col" className="text-center">
                  Total
                </th>
                <th scope="col" className="text-center">
                  Transform
                </th>
              </tr>
            </thead>
          </table>
          {formfields.map((item, index) => {
            item.total = (item.quantity * item.price).toFixed(2);
            let reduction = [...formfields][index].discount_reduction;

            item.total =
              reduction == "flat"
                ? (item.total - item.discount).toFixed(2)
                : (item.total - item.total * (item.discount / 100)).toFixed(2);
            if (reduction != "flat" && item.discount == "")
              item.total = (item.quantity * item.price).toFixed(2);

            return (
              <>
                <div key={index}>
                  <table className=" table ">
                    <tbody>
                      <tr>
                        <td style={{ width: "150px" }} scope="row">
                          <p>{index + 1}</p>
                        </td>
                        <td>
                          <input
                            value={item.product}
                            placeholder="product"
                            onChange={(event) => {
                              let data = [...formfields];
                              data[index].product = event.target.value;
                              setFormFields(data);
                            }}
                          />
                        </td>
                        <td>
                          {" "}
                          <input
                            value={item.price}
                            onChange={(event) => handlePrice(event, index)}
                          />
                        </td>
                        <td>
                          <input
                            value={item.quantity}
                            onChange={(event) => handleQuantity(event, index)}
                          />
                        </td>
                        <td style={{ width: "280px" }}>
                          <div style={{ display: "flex" }}>
                            <input
                              value={item.discount}
                              onChange={(event) => handleDiscount(event, index)}
                            />
                            <select
                              className="form-select"
                              name="discount_type"
                              onChange={(e) => {
                                let data = [...formfields];
                                data[index].discount_reduction = e.target.value;
                                setFormFields(data);
                              }}
                            >
                              <option value="flat">Flat</option>
                              <option value="percentage">%</option>
                            </select>
                          </div>
                        </td>
                        {/* <td>
                          {" "}
                          <input
                            value={item.tax}
                            onChange={(event) => handleTax(event, index)}
                          />
                        </td> */}

                        <td style={{ width: "280px" }}>
                          <span>{item.total}</span>
                        </td>
                        <td style={{ width: "280px" }}>
                          <button
                            type="button"
                            onClick={(event) => Remove_Row(event, index)}
                            className="btn btn-default btn-sm"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </>
            );
          })}
        </form>

        <button
          type="button"
          className="btn btn-default btn-sm"
          onClick={Add_Items}
        >
          <span className="glyphicon glyphicon-plus"></span> Add Items
        </button>
        <div className="m-5">
          <p>SubTotal ${sub_total.toFixed(2)}</p>

          <div>
            VAT Rate :{" "}
            <input
              value={vat}
              onChange={(e) => {
                if (validNumber.test(e.target.value) == true) {
                  setVat(e.target.value);
                }
              }}
            />
            %
          </div>
          <p>Discount ${(sub_total - gross_total).toFixed(2)}</p>
          <p>
            GrossTotal ${(gross_total + gross_total * (vat / 100)).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Form;
