import { SubmitButton } from "@/components/form/Buttons";

import FormContainer from "@/components/form/FormContainer";
import FormInput from "@/components/form/FormInput";
import PriceInput from "@/components/form/PriceInput";
import TextAreainput from "@/components/form/TextAreainput";
import ImageInput from "@/components/form/ImageInput";

import { Button } from "@/components/ui/button";
import { createProductAction } from "@/utils/actions";
import { CheckBoxInput } from "@/components/form/CheckBoxInput";

export default function CreateProductPage() {
  return (
    <section>
      <h1 className="text-2xl font-semibold mb-8 capitalize">create Product</h1>
      <div className="border p-8 rounded-md">
        <FormContainer action={createProductAction}>
          <div className="grid gap-4 md:grid-cols-2 my-4">
            <FormInput
              type="text"
              name="name"
              label="product name"
              defaultValue="slavik"
            />
            <FormInput
              type="text"
              name="company"
              label="company"
              defaultValue="slavik org"
            />

            <PriceInput />
            <ImageInput />
          </div>
          <TextAreainput
            name="description"
            labelText="product description "
            defaultValue="drink desc"
          />
          <div className="mt-6">
            <CheckBoxInput name="featured" label="featured" />
          </div>
          <SubmitButton text="create product" className="mt-8" />
        </FormContainer>
      </div>
    </section>
  );
}
