import PropertyItem from "./PropertyItem";
import { PropertyListType, PropertyType } from "../../../types/dashboard";

export default function PropertyList({ data }: { data: PropertyListType }) {
	console.log(data)
	return (
		<div className="">
			{data.length > 0 ? (
				<div className="gap-3 grid sm:grid-cols-2 lg:grid-cols-4">
					{data.map((item: PropertyType) => {
						return <PropertyItem key={item._id} item={item} />;
					})}
				</div>
			) : (
				<div>Property is empty</div>
			)}
		</div>
	);
}
