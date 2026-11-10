import { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function App() {

  const [cliente, setCliente] = useState('');
  const [producto, setProducto] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [precio, setPrecio] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [hayError, setHayError] = useState(false);
  const [ultimoPedido, setUltimoPedido] = useState(null); 
  const [contador, setContador] = useState(0);

  const formatoPesos = (valor) =>
    '$' + String(valor).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
 
  const mostrarError = (texto) => {
    setHayError(true);
    setMensaje(texto);
    setUltimoPedido(null);
  };

  // Registrar Pedido
  const registrarPedido = () => {
    const nombre = cliente.trim();
    const item = producto.trim();
    const cantidadTexto = cantidad.trim();
    const precioTexto = precio.trim().replace('$', '').replace(/\./g, '');

    // Validaciones de los campos
    if (nombre === '') {
      mostrarError('Debe ingresar el nombre del cliente');
      return;
    }
    if (item === '') {
      mostrarError('Debe ingresar un producto');
      return;
    }
    if (!/^\d+$/.test(cantidadTexto) || Number(cantidadTexto) === 0) {
      mostrarError('Ingrese una cantidad válida');
      return;
    }
    // Solo dígitos: rechaza vacío, letras y negativos
    if (!/^\d+$/.test(precioTexto)) {
      mostrarError('Ingrese un precio unitario válido');
      return;
    }

    // Registrar (solo si todo es válido)
    const total = Number(cantidadTexto) * Number(precioTexto);

    setHayError(false);
    setMensaje('Pedido registrado correctamente');
    setUltimoPedido({
      cliente: nombre,
      producto: item,
      cantidad: Number(cantidadTexto),
      total: total,
    });
    setContador(contador + 1); 
  };

  // Limpieza del formulario
  const limpiarFormulario = () => {
    setCliente('');
    setProducto('');
    setCantidad('');
    setPrecio('');
    setMensaje('');
    setHayError(false);
    setUltimoPedido(null);
  };

  // interfaz de usuario
  return (
    <View style={styles.fondo}>
      <View style={styles.contenedor}>
        <Text style={styles.titulo}>AgroPedidos</Text>
        <Text style={styles.bienvenida}>
          ¡Bienvenido! Registre aquí los pedidos de sus clientes.
        </Text>

        <View style={styles.tarjeta}>
          <Text style={styles.etiqueta}>Nombre del cliente</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej: María Pérez"
            value={cliente}
            onChangeText={setCliente}
          />

          <Text style={styles.etiqueta}>Producto</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej: Bulto de abono"
            value={producto}
            onChangeText={setProducto}
          />

          <Text style={styles.etiqueta}>Cantidad (unidades)</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej: 5"
            keyboardType="numeric"
            value={cantidad}
            onChangeText={setCantidad}
          />

          <Text style={styles.etiqueta}>Precio unitario ($)</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej: 3000"
            keyboardType="numeric"
            value={precio}
            onChangeText={setPrecio}
          />

          <View style={styles.boton}>
            <Button title="Registrar pedido" color="#2e7d32" onPress={registrarPedido} />
          </View>
          <View style={styles.boton}>
            <Button title="Limpiar" color="#757575" onPress={limpiarFormulario} />
          </View>
        </View>

        {mensaje !== '' && (
          <Text style={[styles.mensaje, hayError ? styles.error : styles.exito]}>
            {mensaje}
          </Text>
        )}
        {ultimoPedido && (
          <View style={styles.resumen}>
            <Text style={styles.lineaResumen}>Cliente: {ultimoPedido.cliente}</Text>
            <Text style={styles.lineaResumen}>Producto: {ultimoPedido.producto}</Text>
            <Text style={styles.lineaResumen}>Cantidad: {ultimoPedido.cantidad}</Text>
            <Text style={styles.total}>Total: {formatoPesos(ultimoPedido.total)}</Text>
          </View>
        )}

        <Text style={styles.contador}>Pedidos registrados: {contador}</Text>
      </View>
    </View>
  );
}

// Estilos
const styles = StyleSheet.create({
  fondo: {
    flex: 1,
    backgroundColor: '#f1f8e9',
    alignItems: 'center',
  },
  contenedor: {
    width: '100%',
    maxWidth: 500,
    padding: 20,
    paddingTop: 50,
  },
  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#0e4e11',
    textAlign: 'center',
  },
  bienvenida: {
    fontSize: 15,
    color: '#555',
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 16,
  },
  tarjeta: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#c5e1a5',
  },
  etiqueta: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#9e9e9e',
    borderRadius: 8,
    backgroundColor: '#ffffff',
    padding: 10,
    fontSize: 16,
  },
  boton: {
    marginTop: 12,
  },
  mensaje: {
    marginTop: 14,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  error: { color: '#c62828' },
  exito: { color: '#0e4e11' },
  resumen: {
    marginTop: 10,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#c5e1a5',
  },
  lineaResumen: {
    textAlign: 'center',
    fontSize: 15,
    color: '#333',
  },
  total: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0e4e11',
    marginTop: 4,
  },
  contador: {
    marginTop: 14,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    color: '#333',
  },
});
