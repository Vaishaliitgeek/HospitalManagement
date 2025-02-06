const impersonationMiddleware = async (req, res, next) => {
  try {
    const { role } = req.user; // Extract role 
    const { doctorId } = req.headers;

    if (role === 'head' && doctorId) {
      const doctor = await Doctor.findByPk(doctorId);
      if (!doctor) {
        return res.status(404).json({ message: 'Doctor not found for impersonation.' });
      }

      req.impersonatedDoctor = doctor; 
    }

    next();
  } catch (error) {
    console.error('Impersonation error:', error);
    res.status(500).json({ message: 'Internal Server Error during impersonation.' });
  }
};

module.exports = {impersonationMiddleware};

