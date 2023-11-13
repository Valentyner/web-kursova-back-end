import TenderModel from "../model/tenderModel.js";

export const create = async (req, res) => {
  try {
    const doc = new TenderModel({
      title: req.body.title,
      text: req.body.text,
      price: req.body.price,
      unifiedStateRegister: req.body.unifiedStateRegister,
      legalEntity: req.body.legalEntity,
    });

    const tender = await doc.save();

    const year = new Date().getFullYear();
    const month = (new Date().getMonth() + 1).toString().padStart(2, "0");
    const day = new Date().getDate().toString().padStart(2, "0");
    const count = await TenderModel.countDocuments();
    const objectId = count + 1;

    const code = `UA-P-${year}-${month}-${day}-00000${objectId}-a`;

    tender.code = code;

    const updatedTender = await tender.save();

    res.json(updatedTender);
  } catch (error) {
    res.status(500).json({
      message: "Помилка створення",
    });
    console.log(error);
  }
};

export const getAll = async (req, res) => {
  try {
    const tenders = [];
    let tendersData = await TenderModel.find();

    for (let tender of tendersData) {
      tenders.push({
        _id: tender._id,
        title: tender.title,
        text: tender.text,
        price: tender.price,
        code: tender.code,
        unifiedStateRegister: tender.unifiedStateRegister,
        legalEntity: tender.legalEntity,
        createdAt: tender.createdAt.toLocaleString(),
        updatedAt: tender.updatedAt.toLocaleString(),
      });
    }
    res.json(tenders);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Статті не знайдено",
    });
  }
};

export const getOne = async (req, res) => {
  const { id } = req.params;

  try {
    // Знаходимо тендер за його id
    const tender = await TenderModel.findById(id);

    // Перевіряємо, чи тендер був знайдений
    if (!tender) {
      return res.status(404).json({ message: "Тендер не знайдено" });
    }

    res.json(tender);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Помилка при знаходженні тендера за id",
    });
  }
};

export const remove = async(req, res) => {
  try {
      const tenderId = req.params.id;

      TenderModel.findByIdAndDelete({
          _id: tenderId,
      }).then(doc => {
          if(!doc) {
              return res.status(404).json({
                  message: "Статтю не знайдено",
              });
          }

          res.json({
              success: true,
          });

      }).catch(err => {
          console.log(err);
          return res.status(404).json({
              message: "Не вдалося видалити статтю",
          })
      })
  } catch (error) {
      console.log(err)
      res.status(500).json({
          message: "Cтаттю не знайдено",
      })
  }
}

export const update = async (req, res) => {
  try {
      const tenderId = req.params.id;

      await TenderModel.findByIdAndUpdate({
          _id: tenderId,
      },
      {
          title: req.body.title,
          text: req.body.text,
          price: req.body.price,
          unifiedStateRegister: req.body.unifiedStateRegister,
          legalEntity: req.body.legalEntity,
      })

      res.json({
          success: true,
      })
  } catch (error) {
      console.log(err)
      res.status(500).json({
          message: "Cтаттю не знайдено",
      })
  }
}