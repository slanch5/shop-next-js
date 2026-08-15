import { SubmitButton } from "@/components/form/Buttons";
import { CheckBoxInput } from "@/components/form/CheckBoxInput";
import FormContainer from "@/components/form/FormContainer";
import FormInput from "@/components/form/FormInput";
import ImageInputContainer from "@/components/form/ImageInputContainer";
import PriceInput from "@/components/form/PriceInput";
import TextAreainput from "@/components/form/TextAreainput";
import {
  fetchAminProductDetails,
  updateProductAction,
  updateProductImageAction,
} from "@/utils/actions";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export default async function EditProductPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const product = await fetchAminProductDetails(id);
  const { name, company, price, description, featured } = product;
  return (
    <section>
      <h1 className="text-2xl font-semibold mb-8 capitalize">update product</h1>

      <div className="border p-8 rounded">
        <ImageInputContainer
          action={updateProductImageAction}
          name={name}
          image={product.image}
          text="update image"
        >
          <input type="hidden" name="id" value={id} />
          <input type="hidden" name="url" value={product.image} />
        </ImageInputContainer>

        <FormContainer action={updateProductAction}>
          <div className="grid gap-4 md:grid-cols-2 my-4">
            <input type="hidden" name="id" value={id} />
            <FormInput
              type="text"
              name="name"
              label="product name"
              defaultValue={name}
            />
            <FormInput type="text" name="company" defaultValue={company} />

            <PriceInput defaultValue={price} />
          </div>
          <TextAreainput
            name="description"
            labelText="product description"
            defaultValue={description}
          />

          <div className="mt-6">
            <CheckBoxInput
              name="featured"
              label="featured"
              defaultChecked={featured}
            />
          </div>

          <div>
            <Label htmlFor="category">Category</Label>
            <Select name="category" defaultValue="whiskey">
              <SelectTrigger id="category">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="whiskey">Whiskey</SelectItem>
                <SelectItem value="vodka">Vodka</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <SubmitButton text="update product" className="mt-8" />
        </FormContainer>
      </div>
    </section>
  );
}
