export const fetchPlace = async (text) => {
    try {
        const REACT_APP_MAP_API_KEY = "pk.eyJ1IjoiampvcmFuc2VuIiwiYSI6ImNsMGtodm9jcjBtcTYzZm9hN3cwNTI3c28ifQ.QI1eun7oh82w9UbEWT9a-g"
      const res = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${text}.json?access_token=${REACT_APP_MAP_API_KEY}&cachebuster=1625641871908&autocomplete=true&types=place`
      );
      if (!res.ok) throw new Error(res.statusText);
      return res.json();
    } catch (err) {
      return { error: "Unable to retrieve places" };
    }
  };

export const fetchZip = async (xCord, yCord) => {
    try {
        const REACT_APP_MAP_API_KEY = "pk.eyJ1IjoiampvcmFuc2VuIiwiYSI6ImNsMGtodm9jcjBtcTYzZm9hN3cwNTI3c28ifQ.QI1eun7oh82w9UbEWT9a-g"
      const res = await fetch(
          `https://api.mapbox.com/v4/geocode/mapbox.places/${xCord},${yCord}.json?access_token=${REACT_APP_MAP_API_KEY}`
      );
      if (!res.ok) throw new Error(res.statusText);
      let response = res.json()
      return response.features.filter(zip => zip.place_type[0] === "postcode").map(zip => zip.text);
    } catch (err) {
        console.log(err)
      return { error: "Unable to retrieve places" };
    }
  };