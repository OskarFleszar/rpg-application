import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CharacterSkills from "../components/CharacterSkills";
import CharacterWeapons from "../components/CharacterWeapons";
import CharacterArmor from "../components/CharacterArmor";
import CharacterItems from "../components/CharacterItems";
import "../styles/CharacterCreator.sass";
import axios from "axios";
import "../styles/CharacterForm.sass";
import CharacterAttributes from "../components/CharacterAttributes";

const CharacterForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);
  const dataFetchedRef = useRef(false);

  // Zarządzanie stanem dla różnych sekcji
  const [character, setCharacter] = useState({
    name: "",
    race: "",
    currentProfession: "",
    lastProfession: "",
    age: 0,
    gender: "",
    eyeColor: "",
    weight: 0,
    hairColor: "",
    height: 0,
    starSign: "",
    siblings: 0,
    birthPlace: "",
    specialSigns: "",
    campaignName: "",
    campaignYear: "",
    currentExp: 0,
    totalExp: 0,
    backstory: "",
    gold: 0,
    silver: 0,
    bronze: 0,
    notes: "",
  });
  const [weapons, setWeapons] = useState([]);
  const [attributes, setAttributes] = useState({});
  const [skills, setSkills] = useState({});
  const [armor, setArmor] = useState([]);
  const [equipment, setEquipment] = useState([]);
  const [talents, setTalents] = useState([]);
  const [message, setMessage] = useState("");

  // Pobieranie danych postaci lub domyślnych wartości dla nowej postaci
  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;

    const fetchCharacterData = async () => {
      try {
        if (isEditMode) {
          // Tryb edycji - pobierz dane istniejącej postaci
          const response = await axios.get(
            `http://localhost:8080/api/character/${id}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );

          const data = response.data;
          setCharacter(data);
          setWeapons(data.weapons || []);
          setArmor(data.armor || []);
          setEquipment(data.equipment || []);
          setTalents(data.talents || []);
          setAttributes(data.attributes.attributes || data.attributes);
          setSkills(data.skills.skills || data.skills); // Dostosowanie do struktury
          console.log("Pobrane skile postaci:", data.skills);
          console.log("Pobrane atrybuty postaci:", data.attributes);
        } else {
          // Tryb tworzenia nowej postaci - pobierz domyślne wartości
          const responseSkl = await axios.get(
            "http://localhost:8080/api/character/default-skills",
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          const responseAtt = await axios.get(
            "http://localhost:8080/api/character/default-attributes",
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          setSkills(responseSkl.data.skills || {});
          setAttributes(responseAtt.data.attributes || {});
        }
      } catch (error) {
        console.error("Błąd podczas ładowania danych postaci:", error);
      }
    };

    fetchCharacterData();
  }, [id, isEditMode]);

  // Aktualizacja zmian w skillsach
  useEffect(() => {
    console.log("zaktualizowane skile:", skills);
  }, [skills]);

  useEffect(() => {
    console.log("zaktualizowane atrybuty:", attributes);
  }, [attributes]);

  // Obsługa usuwania postaci
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/character/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      navigate("/characters");
    } catch (error) {
      console.error("Błąd podczas usuwania postaci:", error);
    }
  };

  // Formatuj cechy dla backendu
  const prepareAttributesForBackend = (attributes) => {
    const formattedAttributes = {};
    for (const [name, values] of Object.entries(attributes)) {
      formattedAttributes[name] = {
        baseValue: values.baseValue || 0,
        advancementPoints: values.advancementPoints || 0,
        currentValue: values.currentValue || 0,
      };
    }
    return { attributes: formattedAttributes };
  };

  // Formatuj umiejętności dla backendu
  const prepareSkillsForBackend = (skills) => {
    const formattedSkills = {};
    for (const [skillName, skillInfo] of Object.entries(skills)) {
      formattedSkills[skillName] = {
        level: skillInfo.level,
        type: skillInfo.type,
      };
    }
    return { skills: formattedSkills };
  };

  // Obsługa zapisywania zmian
  const handleSaveChanges = async () => {
    const characterData = {
      ...character,
      attributes: prepareAttributesForBackend(attributes),
      skills: prepareSkillsForBackend(skills),
      weapons,
      armor,
      equipment,
      talents,
    };
    console.log("Dane do wysłania:", JSON.stringify(characterData, null, 2));

    try {
      if (isEditMode) {
        await axios.put(
          `http://localhost:8080/api/character/${id}`,
          characterData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          }
        );
      } else {
        await axios.post("http://localhost:8080/api/character", characterData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        });
      }
      setMessage("Zmiany zostały zapisane pomyślnie.");
    } catch (error) {
      setMessage("Wystąpił błąd podczas zapisywania zmian.");
      console.error("Błąd podczas zapisywania zmian:", error);
    }
  };

  // Obsługa zmiany w danych postaci
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCharacter((prevCharacter) => ({
      ...prevCharacter,
      [name]: value,
    }));
  };

  return (
    <div className="character-creator">
      <h2>Edytuj Postać</h2>
      <form>
        <div>
          <label>Nazwa postaci:</label>
          <input
            type="text"
            name="name"
            value={character.name || ""}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Rasa:</label>
          <input
            type="text"
            name="race"
            value={character.race || ""}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Profesja:</label>
          <input
            type="text"
            name="currentProfession"
            value={character.currentProfession || ""}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Poprzednia profesja:</label>
          <input
            type="text"
            name="lastProfession"
            value={character.lastProfession || ""}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Kampania:</label>
          <input
            type="text"
            name="campaignName"
            value={character.campaignName || ""}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Rok Kampanii:</label>
          <input
            type="text"
            name="campaignYear"
            value={character.campaignYear || ""}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Wiek:</label>
          <input
            type="number"
            name="age"
            value={character.age || 0}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Płeć:</label>
          <input
            type="text"
            name="gender"
            value={character.gender || ""}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Kolor oczu:</label>
          <input
            type="text"
            name="eyeColor"
            value={character.eyeColor || ""}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Waga:</label>
          <input
            type="number"
            name="weight"
            value={character.weight || 0}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Kolor włosów:</label>
          <input
            type="text"
            name="hairColor"
            value={character.hairColor || ""}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Wzrost:</label>
          <input
            type="number"
            name="height"
            value={character.height || 0}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Znak gwiezdny:</label>
          <input
            type="text"
            name="starSign"
            value={character.starSign || ""}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Rodzeństwo:</label>
          <input
            type="number"
            name="siblings"
            value={character.siblings || 0}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Miejsce urodzenia:</label>
          <input
            type="text"
            name="birthPlace"
            value={character.birthPlace || ""}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Znaki szczegolne:</label>
          <input
            type="text"
            name="specialSigns"
            value={character.specialSigns || ""}
            onChange={handleChange}
          />
        </div>
        <h3>Exp</h3>
        <div>
          <label>Obecny Exp:</label>
          <input
            type="number"
            name="currentExp"
            value={character.currentExp || 0}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Total Exp:</label>
          <input
            type="number"
            name="totalExp"
            value={character.totalExp || 0}
            onChange={handleChange}
          />
        </div>
        {/* Sekcja Cech */}
        <h3>Cechy</h3>
        <CharacterAttributes
          attributes={attributes}
          setAttributes={setAttributes}
        />

        {/* Sekcja Umiejętności */}
        <h3>Umiejętności</h3>
        <CharacterSkills skills={skills} setSkills={setSkills} />

        {/* Sekcja Bronie */}
        <h3>Bronie</h3>
        <CharacterWeapons weapons={weapons} setWeapons={setWeapons} />

        {/* Sekcja Zbroje */}
        <h3>Armor</h3>
        <CharacterArmor armor={armor} setArmor={setArmor} />
        <div>
          <label>Złote korony:</label>
          <input
            type="number"
            name="gold"
            value={character.gold || 0}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Srebrne Szylingi:</label>
          <input
            type="number"
            name="silver"
            value={character.silver || 0}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Miedziaki:</label>
          <input
            type="number"
            name="bronze"
            value={character.bronze || 0}
            onChange={handleChange}
          />
        </div>
        {/* Sekcja Ekwipunek */}
        <CharacterItems items={equipment} setItems={setEquipment} />

        {/* Sekcja Talenty */}
        <CharacterItems items={talents} setItems={setTalents} />
        <div>
          <label>Historia:</label>
          <textarea
            name="backstory"
            value={character.backstory || ""}
            onChange={handleChange}
          ></textarea>
        </div>
        <div>
          <label>Notatki:</label>
          <textarea
            name="notes"
            value={character.notes || ""}
            onChange={handleChange}
          ></textarea>
        </div>
        <button type="button" onClick={handleSaveChanges}>
          {isEditMode ? "Zapisz zmiany" : "Utwórz postać"}
        </button>
        {isEditMode && (
          <button type="button" onClick={handleDelete}>
            Usuń postać
          </button>
        )}
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default CharacterForm;
