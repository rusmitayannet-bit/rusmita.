import Image from "next/image";
import Link from "next/link";
import { MessageCircle, Camera, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-12 mt-auto">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Marca y Lema */}
        <div className="flex flex-col items-center md:items-start gap-4">
          <div className="relative w-20 h-20 bg-background rounded-full p-2 flex items-center justify-center">
             <Image
                src="/logo-rusmita.png"
                alt="Logo Importadora Rusmita"
                fill
                className="object-contain p-2"
              />
          </div>
          <h2 className="font-heading font-bold text-2xl tracking-wide text-primary">RUSMITA</h2>
          <p className="text-muted-foreground font-medium text-lg italic text-center md:text-left">
            "¡Donde tú sí importas!"
          </p>
        </div>

        {/* Enlaces */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <h3 className="font-heading text-xl mb-2 text-primary-foreground">Enlaces Útiles</h3>
          <Link href="/categoria/novedades" className="hover:text-primary transition-colors">Novedades</Link>
          <Link href="/categoria/ofertas" className="hover:text-primary transition-colors">Ofertas Flash</Link>
          <Link href="/contacto" className="hover:text-primary transition-colors">Contacto</Link>
          <Link href="/terminos" className="hover:text-primary transition-colors">Términos y Condiciones</Link>
        </div>

        {/* Contacto */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <h3 className="font-heading text-xl mb-2 text-primary-foreground">Contáctanos</h3>
          <p className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-accent" />
            +51 987 654 321
          </p>
          <p className="text-sm text-muted-foreground text-center md:text-left mt-2">
            Arequipa, Perú<br/>
            Envíos a nivel nacional
          </p>
          
          <div className="flex gap-4 mt-4">
            <a href="#" className="p-2 bg-muted/10 rounded-full hover:bg-primary transition-colors">
              <MessageCircle className="h-5 w-5" />
            </a>
            <a href="#" className="p-2 bg-muted/10 rounded-full hover:bg-primary transition-colors">
              <Camera className="h-5 w-5" />
            </a>
          </div>
        </div>

      </div>
      
      <div className="container mx-auto px-4 mt-12 pt-6 border-t border-muted/20 text-center text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} Importadora Rusmita. Todos los derechos reservados.
      </div>
    </footer>
  );
}
