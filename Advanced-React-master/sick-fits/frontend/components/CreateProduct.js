import { useMutation } from "@apollo/client";
import gql from 'graphql-tag';
import useForm from "../lib/useForm";
import Form from "./styles/Form";
import DisplayError from "./ErrorMessage";
import { ALL_PRODUCTS_QUERY } from './Products';
import Router from 'next/router';


const CREATE_PRODUCT_MUTATION = gql`
  mutation CREATE_PRODUCT_MUTATION(
    # Which variables are getting passed in? And What types are they
    $name: String!
    $description: String!
    $price: Int!
    $image: Upload
  ) {
    createProduct(
      data: {
        name: $name
        description: $description
        price: $price
        status: "AVAILABLE"
        photo: { create: { image: $image, altText: $name } }
      }
    ) {
      id
      price
      description
      name
    }
  }
`;

export default function CreateProduct() {

    const {inputs, handleChange, clearForm, resetForm} = useForm({
        image: '',
        name: 'nice shoes',
        price: 2525,
        description: 'this is a test description'
    });

    const [createProduct, {loading, error, data}] = useMutation(
        CREATE_PRODUCT_MUTATION, {
            variables: inputs,
            refetchQueries: [{ query: ALL_PRODUCTS_QUERY }],
        }
    )


    return (
        <Form onSubmit={async(e) => {
            e.preventDefault();
            console.log(inputs);

            await createProduct();
            console.log(response);
            clearForm();
            Router.push({
                pathname: `/product/${res.data.createProduct.id}`,
              });
        }}>
        <DisplayError error={error}/>
           <fieldset disabled={loading} aria-busy={loading}>

           <label>
                Image
                <input type="file" id="image" name="image"
                onChange={handleChange}
                required
                />
            </label>

           <label>
                Name
                <input type="text" id="name" name="name" placeholder="Name" 
                value={inputs.name}
                onChange={handleChange}
                />
            </label>
            <label htmlFor="price">
                Price
                <input type="number" id="price" name="price" placeholder="price" 
                value={inputs.price}
                onChange={handleChange}
                />
            </label>

            <label htmlFor="description">
                Description
                <textarea id="description" name="description" placeholder="description" 
                value={inputs.description}
                onChange={handleChange}
                ></textarea>
            </label>

            <button type="submit">+ Add Product</button>

           </fieldset>

        </Form>
    );
}

