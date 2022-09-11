//convert timestamp to mm/dd/yy
export default function convertTimestamp(timestamp) {
	const date = new Date(timestamp).toLocaleString("en-US", {
		month: "long",
		day: "numeric",
		year: "numeric",
	});
	return date;
}
