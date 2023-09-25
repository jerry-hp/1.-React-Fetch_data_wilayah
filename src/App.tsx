import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

interface Istate {
  daftarProvinsi: { id: string; name: string }[];
  daftarKabupaten: { id: string; name: string }[];
  daftarKecamatan: { id: string; name: string }[];
  daftarKampung: { id: string; name: string }[];
  provinsi: string;
  kabupaten: string;
  kecamatan: string;
}

class App extends React.Component<{}, Istate> {
  constructor(props: {}) {
    super(props);
    this.state = {u
      daftarProvinsi: [],
      provinsi: "",
      daftarKabupaten: [],
      kabupaten: "",
      daftarKecamatan: [],
      kecamatan: "",
      daftarKampung: [],
    };
  }

  componentDidMount(): void {
    fetch("https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ daftarProvinsi: data });
      });
  }

  handleProvinsi = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const provinsi = event.target.value;
    this.setState({ provinsi });
    this.fetchKabupaten(provinsi);
  };

  fetchKabupaten = (provinsi: string) => {
    fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${provinsi}.json`)
      .then((res) => res.json())
      .then((data) => {
        this.setState({ daftarKabupaten: data });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  handleKabupaten = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const kabupaten = event.target.value;
    this.setState({ kabupaten });
    this.fetchKecamatan(kabupaten);
  };

  fetchKecamatan = (kabupaten: string) => {
    fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/districts/${kabupaten}.json`)
      .then((res) => res.json())
      .then((data) => {
        this.setState({ daftarKecamatan: data });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  handleKecamatan = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const kecamatan = event.target.value;
    this.setState({ kecamatan });
    this.fetchKampung(kecamatan);
  };

  fetchKampung = (kecamatan: string) => {
    fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/villages/${kecamatan}.json`)
      .then((res) => res.json())
      .then((data) => {
        this.setState({ daftarKampung: data });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  render() {
    const { daftarProvinsi, provinsi, daftarKabupaten, kabupaten, daftarKecamatan, kecamatan, daftarKampung } = this.state;

    return (
      <>
        <form className="container">
          <h1 className="text-center  ">DATA WILAYAH INDONESIA</h1>
          <div className="form-group">
            <label htmlFor="provinsi">Provinsi:</label>
            <select className="form-control" id="provinsi" value={provinsi} onChange={this.handleProvinsi}>
              <option value="">Pilih Provinsi</option>
              {daftarProvinsi.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="kabupaten">Kabupaten:</label>
            <select className="form-control" id="kabupaten" value={kabupaten} onChange={this.handleKabupaten}>
              <option value="">Pilih Kabupaten</option>
              {daftarKabupaten.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="kecamatan">Kecamatan:</label>
            <select className="form-control" id="kecamatan" value={kecamatan} onChange={this.handleKecamatan}>
              <option value="">Pilih Kecamatan</option>
              {daftarKecamatan.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="kampung">Kampung:</label>
            <select className="form-control" id="kampung">
              <option value="">Pilih Kampung</option>
              {daftarKampung.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.name}
                </option>
              ))}
            </select>
          </div>
        </form>
      </>
    );
  }
}

export default App;
