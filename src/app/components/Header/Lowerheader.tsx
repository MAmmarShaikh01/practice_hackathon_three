"use client";
import style from "@/css/Lowerheader.module.css";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { client } from "@/sanity/lib/client";

type prod = {
  _id: number;
  name: string;
};

export default function Home() {
  const [dropArray, setDropArray] = useState<prod[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState<prod[]>([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  // Fetch the data
  useEffect(() => {
    const fetchData = async () => {
      const query = await client.fetch(`*[_type == "product"]{
        _id,
        name
      }`);
      setDropArray(query);
    };

    fetchData();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  // Handle search term changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() === "") {
      setFilteredSuggestions([]);
      setIsDropdownVisible(false); // Close dropdown if input is empty
    } else {
      const matches = dropArray.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSuggestions(matches);
      setIsDropdownVisible(true); // Show dropdown when there are matches
    }
  };

  // Handle input focus and blur
  const handleInputFocus = () => {
    if (filteredSuggestions.length > 0) {
      setIsDropdownVisible(true);
    }
  };

  const handleInputBlur = () => {
    // Delay hiding the dropdown to allow click events on dropdown items
    setTimeout(() => setIsDropdownVisible(false), 150);
  };

  return (
    <>
      <header className={style.header}>
        <div className={style.container}>
          <h1 className={style.logo}>Hekto</h1>

          <ul className={style.ul}>
            <li className={style.li}>
              <Link className={style.links} href="../">
                Home
              </Link>
            </li>
            <li className={style.li}>
              <Link className={style.links} href="../ShopGrid">
                Products
              </Link>
            </li>
            <li className={style.li}>
              <Link className={style.links} href="../About">
                About
              </Link>
            </li>
            <li className={style.li}>
              <Link className={style.links} href="../Contact">
                Contact
              </Link>
            </li>
            <li className={style.li}>
              <Link className={style.links} href="../Faqs">
                FAQs
              </Link>
            </li>
          </ul>

          <div className={style.searchWrapper}>
            <div className={style.search}>
              <input
                className={style.input}
                type="search"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearchChange}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
              />
              <Image
                className={style.image}
                src="/img/sear.png"
                alt="search icon"
                width="20"
                height={20}
              />
            </div>

            {/* Dropdown */}
            {isDropdownVisible && filteredSuggestions.length > 0 && (
              <ul className={style.dropdown}>
                {filteredSuggestions.map((item) => (
                  <li key={item._id} className={style.dropdownItem}>
                    <Link href={`/products/${item._id}`}>
                    {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
