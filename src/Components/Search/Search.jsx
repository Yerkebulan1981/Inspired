import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Container } from '../Layout/Container/Container';
import s from './Search.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { toggleSearch } from '../../Features/searchSlice';

export const Search = () => {
  const { openSearch } = useSelector((state) => state.search);
  const dispatch = useDispatch();

  const initialValues = {
    search: '',
  };

  const validationSchema = Yup.object({
    search: Yup.string().required('Поле обязательное для заполнения'),
  });

  const navigate = useNavigate();

  const handleSubmit = ({ search }, { resetForm }) => {
    if (search.trim()) {
      navigate(`/search?q=${search}`);
      resetForm();
      dispatch(toggleSearch(false));
    }
  };

  return (
    openSearch && (
      <div className={s.search}>
        <Container>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}>
            <Form className={s.form}>
              <Field
                className={s.input}
                type='search'
                name='search'
                placeholder='Найти...'
              />
              <ErrorMessage name='search' component={'p'} className={s.error} />
              <button className={s.btn} type='submit'>
                Искать
              </button>
            </Form>
          </Formik>
        </Container>
      </div>
    )
  );
};
