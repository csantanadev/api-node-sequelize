class HomeController {

    index (req, res) {

        res.status(200).json({
            tudo_ok: false
        })
    }
    
}


export default new HomeController()