import React, { useState, useEffect } from "react";
import { StarIcon } from "@heroicons/react/24/solid";
import { Modal } from "./components/Modal";
import { Input } from "./components/Input";

function MoviesDB() {
	const [movies, setMovies] = useState([
		{
			name: "Apex",
			img: "https://images.unsplash.com/photo-1605559911160-a3d95d213904",
			rating: 4.5,
			year: "2015",
		},

		{
			name: "Amina",
			img: "https://plus.unsplash.com/premium_photo-1682125157065-cbc4eb0fe0bb",
			rating: 4.5,
			year: "2020",
		},

		{
			name: "Avatar",
			img: "https://images.unsplash.com/photo-1485795959911-ea5ebf41b6ae",
			rating: 5.0,
			year: "2024",
		},

		{
			name: "Joker",
			img: "https://images.unsplash.com/photo-1620510625142-b45cbb784397",
			rating: 4.5,
			year: "2012",
		},
	]);

	const [searchTerm, setSearchTerm] = useState("");
	const [searchResult, setSearchResult] = useState([]);

	const [newMovie, setNewMovie] = useState({
		name: "",
		img: "",
		year: "",
		rating: 0,
	});

	let [isOpen, setIsOpen] = useState(false);

	function closeModal() {
		setIsOpen(false);
	}

	function openModal() {
		setIsOpen(true);
	}

	const handleChange = (event) => {
		setSearchTerm(event.target.value);
	};

	useEffect(() => {
		if (searchTerm.length > 0) {
			let filteredResult = movies.filter((movie) =>
				movie.name.toLowerCase().includes(searchTerm.toLowerCase())
			);

			setSearchResult(filteredResult);
		}
	}, [searchTerm]);

	const handleAddMoviesChange = (event) => {
		const { name, value } = event.target;

		setNewMovie((prevMovie) => ({
			...prevMovie,
			[name]: value,
		}));
	};

	const handleSubmit = () => {
		setMovies((prevMovies) => [...prevMovies, newMovie]);
		alert("Movie saved successfully");
		// setNewMovie({
		// 	name: "",
		// 	img: "",
		// 	year: "",
		// 	rating: 0,
		// });
		closeModal();
	};

	console.log(newMovie);

	return (
		<div className="pt-10 pb-20">
			<h1 className="text-3xl font-extrabold text-center">Most Popular</h1>
			<p className="text-lg pt-2 text-center">My movies database</p>

			<div className="fixed inset-0 flex items-center justify-center">
				<button
					type="button"
					onClick={openModal}
					className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
				>
					Add Movies
				</button>
			</div>

			<div className="pt-5">
				<input
					className="w-full h-[56px] px-5 border-2 rounded-full outline-1 capitalize outline-blue-300"
					onChange={handleChange}
					placeholder="Search for any movie"
				/>
			</div>
			<div className="pt-10">
				{searchResult.length > 0 ? (
					<div className="grid grid-cols-3 h-auto  gap-10">
						{searchResult.map(({ name, img, rating, year }) => (
							<div className="">
								<div className="w-[200px] h-[250px] ">
									<img className="w-full h-full object-cover" src={img} />
								</div>

								<div className="pt-3">
									<p className="text-2xl font-bold">{name}</p>
									<div className="flex items-center gap-4 py-2 ">
										<p className="text-base font-semibold">{year}</p>
										<div className="w-3 h-3 rounded-full bg-gray-500" />
										<div className="flex items-center gap-1">
											<StarIcon className="w-4 h-4 text-yellow-500" />
											<p className="text-base font-medium">{rating}</p>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				) : movies.length > 0 ? (
					<div className="grid grid-cols-3 h-auto  gap-10">
						{movies.map(({ name, img, rating, year }) => (
							<div className="">
								<div className="w-[200px] h-[250px] ">
									<img className="w-full h-full object-cover" src={img} />
								</div>

								<div className="pt-3">
									<p className="text-2xl font-bold">{name}</p>
									<div className="flex items-center gap-4 py-2 ">
										<p className="text-base font-semibold">{year}</p>
										<div className="w-3 h-3 rounded-full bg-gray-500" />
										<div className="flex items-center gap-1">
											<StarIcon className="w-4 h-4 text-yellow-500" />
											<p className="text-base font-medium">{rating}</p>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				) : (
					<div>
						<p className="font-semibold">
							There are no movies available in the Database...
						</p>
					</div>
				)}
			</div>

			<Modal isOpen={isOpen} closeModal={closeModal} title="Add Movies Modal">
				<div>
					<Input
						placeholder="Please enter movie image url"
						label="Image URL"
						name="img"
						handleChange={handleAddMoviesChange}
					/>

					<Input
						placeholder="Please enter movie name "
						label="Name"
						name="name"
						handleChange={handleAddMoviesChange}
					/>
					<Input
						placeholder="Please enter movie name "
						label="Released Year"
						type="date"
						name="year"
						handleChange={handleAddMoviesChange}
					/>
					<Input
						placeholder="Please enter movie rating "
						label="Rating"
						type="number"
						name="rating"
						handleChange={handleAddMoviesChange}
					/>
				</div>

				<div className="flex items-center justify-between pt-5 ">
					<div className="mt-4">
						<button
							type="button"
							onClick={handleSubmit}
							className="inline-flex justify-center rounded-md border border-transparent bg-black px-4 py-2 text-sm font-medium text-white hover:bg-blue-200 hover:text-blue-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
						>
							Submit
						</button>
					</div>

					<div className="mt-4">
						<button
							type="button"
							className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
							onClick={closeModal}
						>
							Cancel
						</button>
					</div>
				</div>
			</Modal>
		</div>
	);
}
export default MoviesDB;
