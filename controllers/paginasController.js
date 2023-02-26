import {Viaje} from '../models/Viaje.js';
import { Testimonial } from '../models/Testimoniales.js';

const paginaInicio = async (req, res) => { // req - lo que enviamos : res - lo que express nos responde [servidor]
    const promiseDB = [];
    promiseDB.push(Viaje.findAll({limit: 3}));
    promiseDB.push(Testimonial.findAll({limit: 3}));
    try {
    //consultar 3 viajes del modelo Viaje
        const resultado = await Promise.all(promiseDB);
        res.render('Inicio', {
            pagina: 'Inicio',
            clase: 'home',
            viajes: resultado[0],
            testimoniales: resultado[1]
        });
    } catch (error) {
        console.log(error);
    };
};

const paginaNosotros = (req, res) => {
    res.render('nosotros', {
        pagina: 'Nosotros'
    });
};

const paginaTestimonios = async (req, res) => {
    try {
        const testimoniales = await Testimonial.findAll();
        res.render('testimoniales', {
            pagina: 'Testimoniales',
            testimoniales
        });
    } catch (error) {
        console.log(error);
    };
};

const paginaViajes = async (req, res) => {
    //consultar BD
    const viajes = await Viaje.findAll();
    res.render('viajes', {
        pagina: 'Proximos Viajes',
        viajes
    });
};

// muestra un viaje por su slug
const paginaDetalleViaje = async (req, res) => {
    const {slug} = req.params;
    try {
        const resultado = await Viaje.findOne({ where: {slug}});

        res.render('viaje', {
            pagina: 'Informacion del viaje',
            resultado
        });
    } catch (error) {
        console.log(error);
    };
};



export {
    paginaInicio,
    paginaNosotros,
    paginaTestimonios,
    paginaViajes,
    paginaDetalleViaje,
}