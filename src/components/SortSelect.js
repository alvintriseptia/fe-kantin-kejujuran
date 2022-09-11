import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function SortSelect({ sortBy, setSortBy }) {
	const handleChange = (event) => {
		if (event.target.value === "") {
			setSortBy("");
		} else {
			const result = event.target.value.split(",");
			if (sortBy[0] !== result[0] || sortBy[1] !== result[1]) {
				setSortBy(result);
			}
		}
	};

	return (
		<Box sx={{ minWidth: 120 }}>
			<FormControl fullWidth>
				<InputLabel id="select-label">Sort By</InputLabel>
				<Select
					labelId="select-label"
					id="select"
					value={sortBy}
					label="Sort By"
					onChange={handleChange}
				>
					<MenuItem value={""}>None</MenuItem>
					<MenuItem value={"name,asc"}>Products Name (Ascending)</MenuItem>
					<MenuItem value={"name,desc"}>Products Name (Descending)</MenuItem>
					<MenuItem value={"date,asc"}>Products Added (Oldest)</MenuItem>
					<MenuItem value={"date,desc"}>Products Added (Newest)</MenuItem>
					<MenuItem value={"price,asc"}>Products Price (Lowest)</MenuItem>
					<MenuItem value={"price,desc"}>Products Price (Highest)</MenuItem>
				</Select>
			</FormControl>
		</Box>
	);
}
